import { useState } from 'react'

export const useProgressBoard = () => {
  // ゴールまでのステップ数
  const fieldStep = 10

  // fieldStepの数だけ要素がある配列
  const fieldStepArray = new Array(fieldStep - 1).fill(null)

  // 現在地
  const [currentStep, setCurrentStep] = useState<number>(0)

  return {
    fieldStep,
    fieldStepArray,
    currentStep,
  }
}
