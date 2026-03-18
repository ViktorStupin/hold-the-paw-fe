import type { PetProfileFormValues } from '@/schemas/pet.schema';
import type { FieldPath } from "react-hook-form";
import { StepFour } from '../StepFour';
import { StepOne } from '../StepOne/StepOne';
import { StepThree } from '../StepThree';
import { StepTwo } from '../StepTwo';

type StepComponent = React.FC;


type Step = {
  component: StepComponent;
  title: string;
  fields: FieldPath<PetProfileFormValues>[];
};

export const steps: Step[] = [
  { component: StepOne, title: "Основне", fields: ["name", "location", "photos"] },
  { component: StepTwo, title: "Параметри", fields: ["status", "gender", "age", "breed", "size", "pet_type"] },
  { component: StepThree, title: "Деталі", fields: ["color", "special_needs", "has_passport", "is_vaccinated"] },
  { component: StepFour, title: "Опис", fields: ["story", "about"] },
];
