import { z } from 'zod';
import { ReqeustPetShema } from './pet.create.shema';
export const updatePetSchema = ReqeustPetShema.partial();

export type TUpdatePet = z.infer<typeof updatePetSchema>;
