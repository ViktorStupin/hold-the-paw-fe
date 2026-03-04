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
    <div className='u-container'>
      <section className='pt-1 pb-8  lg:pt-10 lg:pb-10'>
        <ProgressBar currentStep={currentStep} />
        {React.createElement(step.component)}
        <div className='flex justify-center gap-10 mt-6 lg:max-w-4xl lg:mx-auto lg:mt-10'>
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
            {currentStep === steps.length - 1 ? 'Завершити' : 'Продовжити'}
          </Button>
        </div>
      </section>
    </div>
  );
};
