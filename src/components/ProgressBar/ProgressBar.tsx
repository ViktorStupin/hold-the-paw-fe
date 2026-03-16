import { cn } from '@/lib/utils';
import { useIsMobile } from '@/utils/helpers/layouts/useIsMobile';
import clsx from 'clsx';
import React from 'react';
import { steps } from '../steps/constants/steps';
import { Check } from 'lucide-react';
import { Icon } from '../ui/icon';

interface IProgressBarProps {
  currentStep: number;
}

export const ProgressBar: React.FC<IProgressBarProps> = ({ currentStep }) => {
  const isMobile = useIsMobile();

  return (
    <div className='flex items-center px-6 mt-2 mb-6 lg:max-w-276 lg:mx-auto lg:mt-0 lg:px-16 lg:mb-20'>
      {steps.map((step, index) => {
        const isActive = index <= currentStep;
        const isCompleted = index < currentStep;
        const isLast = index === steps.length - 1;

        return (
          <React.Fragment key={index}>
            <div
              className={clsx(
                'relative flex flex-col items-center justify-center rounded-full aspect-square',
                'w-6 md: lg:w-11',
                {
                  'bg-primary-40 text-white': isActive,
                  'bg-gray-50 text-gray-0': !isActive,
                }
              )}
            >
              {isCompleted ? (
                <Icon icon={Check} size={isMobile ? 16 : 24} color='#FAFAFA' />
              ) : (
                <span className={cn(' text-gray-0', isMobile ? 'typo-main' : 'typo-h2')}>
                  {index + 1}
                </span>
              )}

              {!isMobile && (
                <h3 className='absolute top-17 whitespace-nowrap text-center typo-h3'>
                  {step.title}
                </h3>
              )}
            </div>
            {!isLast && <div className='flex-1 h-px mx-2 bg-gray-70 lg:mx-8' />}
          </React.Fragment>
        );
      })}
    </div>
  );
};
