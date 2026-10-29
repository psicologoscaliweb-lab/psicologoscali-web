import raw from './site.json';

export type Block =
  | { type: 'h'; text: string; eyebrow?: string }
  | { type: 'p'; text: string }
  | { type: 'img'; value: string }
  | { type: 'btn'; value: { text: string; href: string } }
  | { type: 'acc'; value: { q: string; a: string }[] };

export interface Card { title: string; text: string; href: string; img: string }

export interface Page {
  slug: string;
  title: string;
  status: string;
  seo: string | null;
  hero: { bg: string | null; title: string; subtitle: string };
  body: Block[];
  why: { title: string; text: string }[] | null;
  services: { eyebrow: string; title: string; items: Card[] } | null;
  team?: Card[];
  testimonials: { text: string; name: string }[];
  cta: { title: string; text: string; button: string } | null;
  form: boolean;
  showCatalog?: boolean;
}

export const pages = raw.pages as unknown as Record<string, Page>;
export const catalog = raw.catalog as Card[];
