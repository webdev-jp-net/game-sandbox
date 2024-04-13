import { useState } from 'react'

export const useSugoroku = () => {
  // ゴールまでのステップ数
  const fieldStep = 10

  // コマの現在地
  const [currentStep, setCurrentStep] = useState<number>(0)

  // 抽選処理
  const integrationRollResult = (addStep: number) => {
    setCurrentStep(prev => {
      const nextStep = prev + addStep
      return nextStep > fieldStep ? fieldStep : nextStep
    })
  }

  // リセット処理
  const reset = () => {
    setCurrentStep(0)
  }

  return {
    fieldStep,
    currentStep,
    setCurrentStep,
    integrationRollResult,
    reset,
  }
}
