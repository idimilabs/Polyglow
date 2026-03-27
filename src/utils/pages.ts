import { getCollection, type CollectionEntry } from 'astro:content';
import type { Lang } from '@/utils/i18n';
import { DEFAULT_LANG, SUPPORTED_LANGS } from '@/utils/i18n';

export type PageEntry = CollectionEntry<'page'>;

const publishedPages = await getCollection('page', (entry) => !entry.data.draft);

function createLangMap(): Record<Lang, Array<PageEntry>> {
  return SUPPORTED_LANGS.reduce<Record<Lang, Array<PageEntry>>>(
    (acc, lang) => {
      acc[lang] = [];
      return acc;
    },
    {} as Record<Lang, Array<PageEntry>>,
  );
}

const pagesByLang = createLangMap();

for (const page of publishedPages) {
  const lang = page.data.locales as Lang;
  if (!(SUPPORTED_LANGS as readonly string[]).includes(lang)) continue;
  pagesByLang[lang].push(page);
}

export function getPublishedPages(): Array<PageEntry> {
  return publishedPages;
}

export function getPagesForLang(lang: Lang): Array<PageEntry> {
  return pagesByLang[lang] ?? [];
}

export function getAboutPageForLang(lang: Lang): PageEntry | undefined {
  const pick = (list: Array<PageEntry>) =>
    list.find((entry) => /(^|\/)about(?:\.(md|mdx|markdown))?$/i.test(entry.id));

  return pick(getPagesForLang(lang)) || pick(getPagesForLang(DEFAULT_LANG)) || publishedPages[0];
}
