import { useState } from 'react'

export const useProgressBoard = () => {
  const [currentStep, setCurrentStep] = useState<number>(0)

  return {
    fieldStep: 10,
    currentStep,
  }
}
