import { getCollection, type CollectionEntry } from 'astro:content';
import type { Lang } from '@/utils/i18n';
import { SUPPORTED_LANGS } from '@/utils/i18n';
import { categorySlug, tagSlug } from '@/utils/translations';

export type PostEntry = CollectionEntry<'post'>;
export const CATEGORY_KEYS = ['build', 'invest', 'life'] as const;
export type CategoryKey = (typeof CATEGORY_KEYS)[number];
export const TAG_KEYS = [
  'reflect',
  'media',
  'roam',
  'risk',
  'strategy',
  'allocation',
  'innovation',
  'model',
  'management',
] as const;
export type TagKey = (typeof TAG_KEYS)[number];

const publishedPostsPromise = getCollection('post', (entry) => !entry.data.draft);

export function sortPostsByDate(posts: readonly PostEntry[]): Array<PostEntry> {
  return [...posts].sort(
    (a, b) => new Date(b.data.pubDate).getTime() - new Date(a.data.pubDate).getTime(),
  );
}

export function postSlug(entry: PostEntry, lang: Lang): string {
  const idWithoutExt = entry.id.replace(/\.(md|mdx|markdown)$/i, '');
  return idWithoutExt.replace(new RegExp(`^${lang}/`), '');
}

export function postUrl(entry: PostEntry, lang: Lang): string {
  return `/${lang}/posts/${postSlug(entry, lang)}/`;
}

function createLangBuckets<K extends string>(
  keys: readonly K[],
): Record<Lang, Record<K, Array<PostEntry>>> {
  return SUPPORTED_LANGS.reduce<Record<Lang, Record<K, Array<PostEntry>>>>(
    (acc, lang) => {
      acc[lang] = keys.reduce<Record<K, Array<PostEntry>>>(
        (bucketAcc, key) => {
          bucketAcc[key] = [];
          return bucketAcc;
        },
        {} as Record<K, Array<PostEntry>>,
      );
      return acc;
    },
    {} as Record<Lang, Record<K, Array<PostEntry>>>,
  );
}

function createLangLists(): Record<Lang, Array<PostEntry>> {
  return SUPPORTED_LANGS.reduce<Record<Lang, Array<PostEntry>>>(
    (acc, lang) => {
      acc[lang] = [];
      return acc;
    },
    {} as Record<Lang, Array<PostEntry>>,
  );
}

function sortPostsByDateInPlace(posts: Array<PostEntry>): void {
  posts.sort((a, b) => new Date(b.data.pubDate).getTime() - new Date(a.data.pubDate).getTime());
}

function buildPostIndexes(posts: readonly PostEntry[]) {
  const postsByLang = createLangLists();
  const postsByCategory = createLangBuckets(CATEGORY_KEYS);
  const postsByTag = createLangBuckets(TAG_KEYS);

  for (const post of posts) {
    const lang = post.data.locales as Lang;
    if (!(SUPPORTED_LANGS as readonly string[]).includes(lang)) continue;
    postsByLang[lang].push(post);

    const categoryKey = categorySlug(lang, post.data.category);
    if (categoryKey && categoryKey in postsByCategory[lang]) {
      postsByCategory[lang][categoryKey as CategoryKey].push(post);
    }

    const seenTags = new Set<string>();
    for (const tag of post.data.tags || []) {
      const tagKey = tagSlug(lang, tag);
      if (!tagKey || seenTags.has(tagKey) || !(tagKey in postsByTag[lang])) continue;
      seenTags.add(tagKey);
      postsByTag[lang][tagKey as TagKey].push(post);
    }
  }

  for (const lang of SUPPORTED_LANGS) {
    sortPostsByDateInPlace(postsByLang[lang]);
    for (const key of CATEGORY_KEYS) {
      sortPostsByDateInPlace(postsByCategory[lang][key]);
    }
    for (const key of TAG_KEYS) {
      sortPostsByDateInPlace(postsByTag[lang][key]);
    }
  }

  return { postsByLang, postsByCategory, postsByTag };
}

const postIndexes = await publishedPostsPromise.then((posts) => buildPostIndexes(posts));

export function getPublishedPosts(): Promise<Array<PostEntry>> {
  return publishedPostsPromise;
}

export function getPublishedPostsByLang(): Record<Lang, Array<PostEntry>> {
  return postIndexes.postsByLang;
}

export function getPostsForLang(lang: Lang): Array<PostEntry> {
  return postIndexes.postsByLang[lang] ?? [];
}

export function getPostsByCategory(lang: Lang, slug: string): Array<PostEntry> {
  const key = categorySlug(lang, slug);
  return key && key in postIndexes.postsByCategory[lang]
    ? postIndexes.postsByCategory[lang][key as CategoryKey]
    : [];
}

export function getPostsByTag(lang: Lang, slug: string): Array<PostEntry> {
  const key = tagSlug(lang, slug);
  return key && key in postIndexes.postsByTag[lang] ? postIndexes.postsByTag[lang][key as TagKey] : [];
}

export function countPostsByCategory(lang: Lang, slug: string): number {
  return getPostsByCategory(lang, slug).length;
}

export function countPostsByTag(lang: Lang, slug: string): number {
  return getPostsByTag(lang, slug).length;
}
