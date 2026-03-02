import React from 'react';

type Props = { currentStep: number; changeStep: (step: number) => void; totalSteps: number };

export const ProgressBar: React.FC<Props> = ({ currentStep, changeStep, totalSteps }) => {
  const stepWidth = `${100 / (totalSteps - 1)}%`; // Ширина для лінійок

  return (
    <div className='flex items-center justify-between w-full mb-8 max-w-2xl mx-auto'>
      {Array.from({ length: totalSteps }).map((_, index) => {
        const isActive = index === currentStep;
        const isCompleted = index < currentStep;
        const isLast = index === totalSteps - 1;

        return (
          <React.Fragment key={index}>
            <div className='flex flex-col items-center w-6 md:w-11'>
              <div
                className='w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300'
              >
                {isCompleted ? '✓' : index + 1}
              </div>
            </div>
            {!isLast && (
              <div
                className={`
                  flex-1 h-1 mx-2 bg-gradient-to-r transition-all duration-500
                  ${
                    isCompleted
                      ? 'bg-green-500'
                      : index < currentStep
                        ? 'bg-green-500'
                        : 'bg-gray-200'
                  }
                `}
                style={{ flexBasis: stepWidth }}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};
