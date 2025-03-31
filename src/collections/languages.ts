import { defineCollection, z } from 'astro:content';
import allLanguages from '@collections/languages/all.json';

export const languages = defineCollection({
  loader: () => allLanguages.map(entry => ({
    ...entry,
    id: entry.id.toString(),
  })),
  schema: z.object({
    id: z.string(),
    iso: z.string(),
    name: z.string(),
  }),
});
