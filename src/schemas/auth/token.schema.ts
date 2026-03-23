// schemas/auth/token.schema.ts
import { z } from 'zod';

export const tokenSchema = z.object({
  access: z.string(),
  refresh: z.string(),
});

export type TTokenResponse = z.infer<typeof tokenSchema>;