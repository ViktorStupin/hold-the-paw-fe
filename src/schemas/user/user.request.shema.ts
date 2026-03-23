import z from "zod";
import { extendedPersonalSchema, extendedShelterSchema } from "./user.form.schema";

const extendedShelterSchemaWithoutEmail = extendedShelterSchema.omit({ email: true });
const extendedPersonalSchemaWithoutEmail = extendedPersonalSchema.omit({ email: true });

export const userRequestSchema = z.discriminatedUnion('role', [
  extendedShelterSchemaWithoutEmail,
  extendedPersonalSchemaWithoutEmail,
]);

export type TUserRequest = z.infer<typeof userRequestSchema>
