import React from 'react';
import { DevTool } from '@hookform/devtools';
import { steps } from '@/components/steps/constants/steps';
import { Button } from '@/components/ui/button';
import { PetProfileSchema, type PetProfileFormValues } from '@/schemas/pet.schema';
import { useIsMobile } from '@/utils/hooks/useIsMobile';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ProgressBar } from '@/components/ProgressBar/ProgressBar';
import clsx from 'clsx';
import { scrollTop } from '@/services/layouts';
import { Back } from '@/components/Back/Back';

export const CreatePetProfile = () => {
  const [currentStep, setCurrentStep] = React.useState(0);
  const step = steps[currentStep];
  const isMobile = useIsMobile();
  const StepComponent = step.component;

  const methods = useForm<PetProfileFormValues>({
    resolver: zodResolver(PetProfileSchema),
    mode: 'onChange',
    shouldUnregister: false,
    defaultValues: {
      name: '',
      location: '',
      photos: [],
      story: '',
      about: '',
    },
  });

  const { getFieldState, formState } = methods;

  const isStepValid = step.fields.every((name) => {
    const s = getFieldState(name, formState);
    return !s.invalid;
  });

  const isStepReady = step.fields.every((name) => {
    const s = getFieldState(name, formState);
    return s.isTouched || s.isDirty;
  });

  const canGoNext = isStepValid && isStepReady && !formState.isSubmitting;

  const values = methods.getValues();
  const isWholeFormValid = PetProfileSchema.safeParse(values).success;
  const isFinalButtonDisabled = !isWholeFormValid || formState.isSubmitting;

  const changeStep = (step: number) => {
    if (step < 0 || step >= steps.length) return;
    setCurrentStep(step);
  };

  const next = async () => {
    const ok = await methods.trigger(step.fields);
    if (!ok) return;
    changeStep(currentStep + 1);
    scrollTop();
  };

  const previous = () => {
    if (currentStep === 0) return;
    changeStep(currentStep - 1);
    scrollTop();
  };

  const onSubmit = (data: PetProfileFormValues) => {
    console.log('FINAL SUBMIT', data);
  };

  return (
    <FormProvider {...methods}>
      <div className='bg-nature u-container lg:bg-background'>
        <section className='pb-8 lg:pt-10 lg:pb-10 '>
          {isMobile && <Back onBack={currentStep > 0 ? previous : undefined} />}
          <ProgressBar currentStep={currentStep} />
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <StepComponent />

            <div className='flex justify-center gap-10 mt-6 lg:max-w-4xl lg:mx-auto lg:mt-10'>
              {!isMobile && currentStep > 0 && (
                <Button
                  type='button'
                  onClick={() => previous()}
                  size='default'
                  variant='secondary'
                  className='flex-1'
                >
                  Повернутися назад
                </Button>
              )}

              {currentStep === steps.length - 1 ? (
                <Button
                  key='submit-step'
                  type='submit'
                  variant={isFinalButtonDisabled ? 'lightDisabled' : 'primary'}
                  size='default'
                  className='flex-1'
                >
                  Завершити
                </Button>
              ) : (
                <Button
                  key='next-step'
                  type='button'
                  onClick={next}
                  variant={!canGoNext ? 'lightDisabled' : 'primary'}
                  size='default'
                  className={clsx('flex-1', {
                    'lg:max-w-108': !isMobile && currentStep === 0,
                  })}
                >
                  Продовжити
                </Button>
              )}
            </div>
          </form>
          {/* <DevTool control={methods.control} /> */}
        </section>
      </div>
    </FormProvider>
  );
};
