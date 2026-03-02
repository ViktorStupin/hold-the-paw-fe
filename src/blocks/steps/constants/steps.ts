import type React from 'react';
import { StepFour } from '../StepFour';
import { StepOne } from '../StepOne';
import { StepThree } from '../StepThree';
import { StepTwo } from '../StepTwo';

type Step = {
  component: React.FC;
  title: string;
};

export const steps: Step[] = [
  { component: StepOne, title: 'Основне' },
  { component: StepTwo, title: 'Параметри' },
  { component: StepThree, title: 'Деталі' },
  { component: StepFour, title: 'Опис' },
];
