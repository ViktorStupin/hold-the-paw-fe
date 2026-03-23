import type z from "zod";

export async function safeRequest<T>(
  request: Promise<unknown>,
  schema: z.ZodSchema<T>
): Promise<T> {
  const data = await request;
  return schema.parse(data);
}