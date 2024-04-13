import { useState } from 'react'

export const useSugoroku = () => {
  // ゴールまでのステップ数
  const fieldStep = 10

  // コマの現在地
  const [currentStep, setCurrentStep] = useState<number>(0)

  //

  return {
    fieldStep,
    currentStep,
    setCurrentStep,
  }
}
