import { getCollection, type CollectionEntry } from 'astro:content';
import type { Lang } from '@/utils/i18n';
import { DEFAULT_LANG, SUPPORTED_LANGS } from '@/utils/i18n';

export type AuthorEntry = CollectionEntry<'author'>;

const publishedAuthors = await getCollection('author', (entry) => !entry.data.draft);

function createLangMap(): Record<Lang, Array<AuthorEntry>> {
  return SUPPORTED_LANGS.reduce<Record<Lang, Array<AuthorEntry>>>(
    (acc, lang) => {
      acc[lang] = [];
      return acc;
    },
    {} as Record<Lang, Array<AuthorEntry>>,
  );
}

const authorsByLang = createLangMap();

for (const author of publishedAuthors) {
  const lang = author.data.locales as Lang;
  if (!(SUPPORTED_LANGS as readonly string[]).includes(lang)) continue;
  authorsByLang[lang].push(author);
}

export function getPublishedAuthors(): Array<AuthorEntry> {
  return publishedAuthors;
}

export function getAuthorsForLang(lang: Lang): Array<AuthorEntry> {
  return authorsByLang[lang] ?? [];
}

export function getAuthorForLang(lang: Lang): AuthorEntry | undefined {
  return getAuthorsForLang(lang)[0] || getAuthorsForLang(DEFAULT_LANG)[0] || publishedAuthors[0];
}
