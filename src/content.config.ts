import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Acepta fechas en ISO (2026-06-15) o en formato DD/MM/YYYY (15/06/2026)
const parseFecha = (v: unknown): Date | unknown => {
  if (v instanceof Date) return v;
  if (typeof v === 'string') {
    const m = v.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
    if (m) return new Date(Number(m[3]), Number(m[2]) - 1, Number(m[1]));
    return new Date(v);
  }
  return v;
};

const noticias = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/noticias' }),
  schema: z.object({
    title: z.string(),
    date: z.preprocess(parseFecha, z.date()),
    image: z.string().optional(),
    resumen: z.string().optional(),
    published: z.boolean().default(true),
  }),
});

export const collections = { noticias };
