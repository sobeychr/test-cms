import { sequence } from 'astro:middleware';
import { authMiddleware } from './middleware/auth/auth';

export const onRequest = sequence(
  authMiddleware,
);
