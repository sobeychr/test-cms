import { sequence } from 'astro:middleware';
import { authMiddleware } from './middleware/auth/auth';
import { endMiddleware } from './middleware/core/end';
import { startMiddleware } from './middleware/core/start';

export const onRequest = sequence(
  startMiddleware,
  authMiddleware,
  endMiddleware,
);
