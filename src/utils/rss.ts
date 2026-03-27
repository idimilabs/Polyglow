import rss from '@astrojs/rss';
import type { Lang } from './i18n';
import { t } from './translations';
import { getPostsForLang, postUrl, type PostEntry } from './posts';

function toItem(entry: PostEntry) {
  const lang = entry.data.locales as Lang;
  return {
    title: entry.data.title,
    description: entry.data.description,
    pubDate: entry.data.updatedDate ?? entry.data.pubDate,
    link: postUrl(entry, lang),
    categories: [entry.data.category, ...entry.data.tags],
  };
}

export async function generateRssForLang(lang: Lang, site: URL) {
  const items = getPostsForLang(lang).slice(0, 5).map(toItem);

  const title = `Astrology · ${lang.toUpperCase()}`;
  const description = t(lang, 'site.description');

  return rss({
    title,
    description,
    site,
    items,
    customData: `<language>${lang}</language>`,
  });
}
