import { useState } from 'react'

export const useSugoroku = () => {
  const [currentStep, setCurrentStep] = useState<number>(0)

  return {
    currentStep,
    setCurrentStep,
  }
}
