import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

export const sites = defineCollection({
  loader: glob({
    base: './src/collections/sites',
    pattern: '*.json',
  }),
  schema: z.object({
    country: z.nullable(z.string()),
    endtime: z.nullable(z.number()),
    id: z.number(),
    lang: z.nullable(z.string()),
    name: z.string(),
    starttime: z.nullable(z.number()),
    state: z.nullable(z.string()),
  }),
});
