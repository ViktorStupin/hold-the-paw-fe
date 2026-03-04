import { ProgressBar } from '@/blocks/ProgressBar/ProgressBar';
import { steps } from '@/blocks/steps/constants/steps';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/utils/hooks/useIsMobile';
import React from 'react';

export const CreatePetProfile = () => {
  const [currentStep, setCurrentStep] = React.useState(0);
  const step = steps[currentStep];
  const isMobile = useIsMobile();

  const changeStep = (step: number) => {
    if (step < 0 || step >= steps.length) return;
    setCurrentStep(step);
  };

  return (
    <div className='u-container pt-1 lg:pt-10'>
      <ProgressBar currentStep={currentStep} />
      {React.createElement(step.component)}
      <div className='flex justify-center gap-10 lg:max-w-4xl mx-auto'>
        {!isMobile && currentStep > 0 && (
          <Button
            onClick={() => changeStep(currentStep - 1)}
            size='default'
            variant='secondary'
            className='flex-1'
          >
            Повернутися назад
          </Button>
        )}
        <Button
          onClick={() => changeStep(currentStep + 1)}
          variant='primary'
          size='default'
          className='flex-1 max-w-109.5'
          // disabled={true}
        >
          Продовжити
        </Button>
      </div>
    </div>
  );
};
