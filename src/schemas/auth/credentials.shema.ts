import z from "zod";
import { passwordShema } from "../primitives.schema";

export const credentialsSchema = z.object({
  email: z.email('Невірний email'),
  password: passwordShema,
});

export type TCredentials = z.infer<typeof credentialsSchema>;