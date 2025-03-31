import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

export const sites = defineCollection({
  loader: glob({
    base: './src/collections/sites/',
    pattern: '**/*.json',
  }),
  schema: z.object({
    countries: z.nullable(z.array(z.string())),
    end: z.nullable(z.number()),
    id: z.number(),
    langs: z.nullable(z.array(z.string())),
    name: z.string(),
    region: z.nullable(z.array(z.string())),
    slug: z.number(),
    start: z.nullable(z.number()),
  }),
});
