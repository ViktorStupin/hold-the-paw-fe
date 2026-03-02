import { ProgressBar } from '@/blocks/ProgressBar/ProgressBar'
import { steps } from '@/blocks/steps/constants/steps'
import React from 'react'

export const CreatePetProfile = () => {
  const [currentStep, setCurrentStep] = React.useState(0)

  return (
    <div>ha<ProgressBar currentStep={currentStep} changeStep={setCurrentStep} totalSteps={steps.length} /></div>
  )
}
