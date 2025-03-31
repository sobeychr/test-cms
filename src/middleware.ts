import { sequence } from 'astro:middleware';
import { apiMiddleware } from './middleware/api/api';
import { authMiddleware } from './middleware/auth/auth';
import { endMiddleware } from './middleware/core/end';
import { errorMiddleware } from './middleware/core/error';
import { startMiddleware } from './middleware/core/start';

export const onRequest = sequence(
  startMiddleware,
  errorMiddleware,
  apiMiddleware,
  authMiddleware,
  endMiddleware,
);
