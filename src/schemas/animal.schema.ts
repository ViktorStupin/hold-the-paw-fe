import { z } from "zod";

export const animalSchema = z.object({
  basic: z.object({
    name: z.string().min(1, "Required"),
    type: z.string().min(1, "Required"),
  }),
  details: z.object({
    age: z.number().min(0),
    weight: z.number().min(0),
  }),
  medical: z.object({
    vaccinated: z.boolean(),
    notes: z.string().optional(),
  }),
});

export type AnimalFormValues = z.infer<typeof animalSchema>;