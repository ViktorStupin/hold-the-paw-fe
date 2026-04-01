import React, { useEffect } from 'react';
// import { DevTool } from '@hookform/devtools';
import { steps } from '@/components/steps/constants/steps';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/utils/helpers/layouts/useIsMobile';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ProgressBar } from '@/components/ProgressBar/ProgressBar';
import clsx from 'clsx';
import { scrollTop } from '@/utils/helpers/layouts/layouts';
import { Back } from '@/components/Back/Back';
import { petsServices } from '@/utils/api/services/pets.services';
import { Loader } from 'lucide-react';
import { getServerErrorMessage } from '@/utils/errors/getServerErrorMessage';
import { FieldMessage } from '@/components/ui/field';
import { createPetShema, type TCreatePet } from '@/schemas/pet/pet.create.shema';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from '@/routes/root.config';

export const CreatePetProfile = () => {
  const isMobile = useIsMobile();
  const [currentStep, setCurrentStep] = React.useState(0);
  const step = steps[currentStep];
  const StepComponent = step.component;
  const navigate = useNavigate();

  const methods = useForm<TCreatePet>({
    resolver: zodResolver(createPetShema),
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

  const { getFieldState, formState, watch, clearErrors, setError } = methods;

  const isStepValid = step.fields.every((name) => {
    const s = getFieldState(name, formState);
    return !s.invalid;
  });

  const isStepReady = step.fields.every((name) => {
    const s = getFieldState(name, formState);
    return s.isTouched || s.isDirty;
  });

  const canGoNext = isStepValid && isStepReady && !formState.isSubmitting;
  const isFinalButtonDisabled = !formState.isValid || formState.isSubmitting;

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

  const onSubmit = async (data: TCreatePet) => {
    try {
      const { photos, ...rest } = data;

      await petsServices.createPet({
        ...rest,
        is_sterilized: false,
        main_image: photos[0],
        is_helped: false,
        is_active: true,
        additional_images: photos.slice(1),
      });

      navigate(RoutePath.MyPets);
    } catch (error) {
      setError('root', { message: getServerErrorMessage(error) });
    }
  };

  useEffect(() => {
    const subscription = watch(() => {
      if (formState.errors.root) {
        clearErrors('root');
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, formState.errors.root, clearErrors]);

  return (
    <FormProvider {...methods}>
      <div className='flex-1  flex flex-col bg-nature u-container lg:bg-background'>
        <section className='flex flex-col flex-1 pb-6 lg:block lg:pt-10 lg:pb-10 '>
          {isMobile && <Back onBack={currentStep > 0 ? previous : undefined} />}
          <ProgressBar currentStep={currentStep} />
          <form
            className='flex-1 flex flex-col justify-between lg:block'
            onSubmit={methods.handleSubmit(onSubmit)}
          >
            <StepComponent />

            <div className='flex justify-center gap-10 mt-6 lg:max-w-4xl lg:mx-auto lg:mt-10'>
              {formState.errors.root && (
                <FieldMessage className='mt-2' message={formState.errors.root.message} />
              )}


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
                  {formState.isSubmitting && <Loader />}
                  {formState.isSubmitting ? 'Створення...' : 'Завершити'}
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
