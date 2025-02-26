import { defineCollection, z } from 'astro:content';
import allCountries from '@collections/countries/all.json';

export const countries = defineCollection({
  loader: () => allCountries.map(entry => ({
    cca2: entry.cca2,
    cca3: entry.cca3,
    id: entry.cca3,
    name: entry.name?.common,
    region: entry.region,
  })),
  schema: z.object({
    cca2: z.string(),
    cca3: z.string(),
    id: z.string(),
    name: z.string(),
    region: z.string(),
  }),
});

export const regions = defineCollection({
  loader: () => {
    const regionNames = allCountries.map(entry => entry.region);
    const regionUnique = new Set(regionNames);
    return Array.from(regionUnique).sort().map((name, key) => ({
      id: (key + 1).toString(),
      name,
    }));
  },
  schema: z.object({
    id: z.string(),
    name: z.string(),
  })
});
