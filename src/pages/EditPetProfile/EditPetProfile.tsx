import { useEffect, useState } from 'react';
// import { DevTool } from '@hookform/devtools';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/utils/helpers/layouts/useIsMobile';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Loader } from 'lucide-react';
import { getServerErrorMessage } from '@/utils/errors/getServerErrorMessage';
import { FieldMessage } from '@/components/ui/field';
import { Back } from '@/components/Back/Back';
import { StepOne } from '@/components/steps/StepOne/StepOne';
import { StepTwo } from '@/components/steps/StepTwo';
import { StepThree } from '@/components/steps/StepThree';
import { StepFour } from '@/components/steps/StepFour';
import { Separator } from '@/components/ui/separator';
import { steps } from '@/components/steps/constants/steps';
import { useNavigate, useParams } from 'react-router-dom';
import { useEditPetGuard } from '@/utils/helpers/guards/useEditPetGuard';
import { useGoBack } from '@/utils/helpers/routing/useGoBack';
import { cn } from '@/lib/utils';
import { createPetShema, type TCreatePet } from '@/schemas/pet/pet.create.shema';
import { RoutePath } from '@/routes/root.config';
import { useEditPet } from '@/queries/pets/pets.mutations';

export const EditPetProfile = () => {
  const isMobile = useIsMobile();
  const goBack = useGoBack();
  const { id } = useParams<{ id: string }>();
  const { petFormValues, isLoading, error: guardError } = useEditPetGuard();
  const [activeStep, setActiveStep] = useState(0);
  const navigate = useNavigate();
  const editPet = useEditPet(Number(id));

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

  const { formState, clearErrors, setError, reset } = methods;

  const isFinalButtonDisabled = !formState.isValid || formState.isSubmitting;

  const scrollToStep = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;

    el.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  const onClickSubmit = async () => {
    const isValid = await methods.trigger();
    if (!isValid) return;
    methods.handleSubmit(onSubmit)();
  };

  const onSubmit = async (data: TCreatePet) => {
    try {
      const { photos, ...rest } = data;

      await editPet.mutateAsync({
        ...rest,
        is_sterilized: false,
        main_image: photos[0],
        additional_images: photos.slice(1),
      });
      methods.reset();
      navigate(RoutePath.MyPets);
    } catch (error) {
      setError('root', { message: getServerErrorMessage(error) });
    }
  };

  useEffect(() => {
    clearErrors('root');
  }, [clearErrors]);

  useEffect(() => {
    if (petFormValues) {
      reset(petFormValues);
    }
  }, [petFormValues, reset]);

  useEffect(() => {
    if (!isMobile) return;

    const sections = document.querySelectorAll('.step-block');
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length > 0) {
          const index = Array.from(sections).indexOf(visible[0].target);
          if (index !== -1) {
            setActiveStep(index);
          }
        }
      },
      {
        threshold: [0.2, 0.5],
        rootMargin: '-44px 0px 0px 0px',
      }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [isMobile, isLoading]);

  let content = (
    <section className='relative flex-1 pb-24 lg:block lg:pt-10 lg:pb-10'>
      {isMobile && (
        <div className='sticky top-12.5 z-10 bg-nature shadow-default -mx-4 px-4 flex justify-between'>
          {steps.map((step, index) => (
            <Button
              variant={'transparent'}
              size={'auto'}
              key={step.title}
              type='button'
              onClick={() => {
                setActiveStep(index);
                scrollToStep(`step-${index + 1}`);
              }}
              className={cn(
                ' typo-main p-2.5',
                activeStep === index ? 'text-primary-40' : 'text-gray-90'
              )}
            >
              {step.title}
            </Button>
          ))}
        </div>
      )}

      <form className='grid gap-2 lg:gap-6' onSubmit={methods.handleSubmit(onSubmit)}>
        <div id='step-1' className='step-block scroll-mt-8 py-4 lg:py-8'>
          <h3 className='typo-h3 text-primary-40'>{steps[0].title}</h3>
          <Separator className='my-2 lg:my-3' />
          <StepOne isEdit />
        </div>

        <div id='step-2' className='step-block scroll-mt-8 py-4 lg:py-8'>
          <h3 className='typo-h3 text-primary-40'>{steps[1].title}</h3>
          <Separator className='my-2 lg:my-3' />
          <StepTwo isEdit />
        </div>

        <div id='step-3' className='step-block scroll-mt-8 py-4 lg:py-8'>
          <h3 className='typo-h3 text-primary-40'>{steps[2].title}</h3>
          <Separator className='my-2 lg:my-3' />
          <StepThree isEdit />
        </div>

        <div id='step-4' className='step-block scroll-mt-8 py-4 lg:py-8'>
          <h3 className='typo-h3 text-primary-40'>{steps[3].title}</h3>
          <Separator className='my-2 lg:my-3' />
          <StepFour isEdit />
        </div>
      </form>

      <div className='fixed bottom-6 inset-x-0 px-4 flex lg:static lg:justify-center lg:gap-10 lg:max-w-4xl lg:mx-auto lg:mt-10'>
        {formState.errors.root && (
          <FieldMessage className='mt-2' message={formState.errors.root.message} />
        )}

        {!isMobile && (
          <Button
            type='button'
            onClick={() => goBack()}
            size='default'
            variant='secondary'
            className='flex-1'
          >
            Відмінити
          </Button>
        )}

        <Button
          onClick={onClickSubmit}
          variant={isFinalButtonDisabled ? 'lightDisabled' : 'primary'}
          size='default'
          className='flex-1'
        >
          {formState.isSubmitting && <Loader />}
          {formState.isSubmitting ? 'Збереження...' : 'Зберегти'}
        </Button>
      </div>
    </section>
  );

  if (isLoading) {
    content = (
      <div className='flex flex-1 items-center justify-center'>
        <Loader className='animate-spin' />
      </div>
    );
  }

  if (guardError) {
    content = (
      <div className='flex flex-1 items-center justify-center'>
        <FieldMessage message={guardError} />
      </div>
    );
  }

  return (
    <FormProvider {...methods}>
      <div className='flex-1 flex flex-col bg-nature u-container lg:bg-background'>
        {isMobile && <Back />}
        {content}
      </div>
    </FormProvider>
  );
};
