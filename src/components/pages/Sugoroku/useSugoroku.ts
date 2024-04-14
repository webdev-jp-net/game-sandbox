import { useState } from 'react'

export const useSugoroku = () => {
  // ゴールまでのステップ数
  const fieldStep = 10

  // コマの現在地
  const [currentStep, setCurrentStep] = useState<number>(0)

  // 抽選結果
  const [dice, setDice] = useState<number>(0)

  // さいころをふる
  const actRoll = () => {
    // ランダムに1から6のランダムな整数を返す
    const addStep = Math.floor(Math.random() * 6) + 1
    console.log({ addStep })
    setDice(addStep)

    // コマの現在地を進める
    setCurrentStep(prev => {
      const nextStep = prev + addStep
      return nextStep > fieldStep ? fieldStep : nextStep
    })
  }

  // リセット処理
  const reset = () => {
    setCurrentStep(0)
    setDice(0)
  }

  return {
    fieldStep,
    currentStep,
    dice,
    actRoll,
    reset,
  }
}
