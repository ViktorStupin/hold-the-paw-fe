import { ProgressBar } from '@/blocks/ProgressBar/ProgressBar';
import React from 'react';

export const CreatePetProfile = () => {
  const [currentStep, setCurrentStep] = React.useState(2);

  return (
    <div className='u-container pt-1 lg:pt-10'>
      <ProgressBar currentStep={currentStep} />
      <div className='w-full h-1 bg-gray-200'></div>
    </div>
  );
};
