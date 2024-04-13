import { useState } from 'react'

type useRollDiceProps = {
  setCurrentStep: (step: number) => void
}

export const useRollDice = ({ setCurrentStep }: useRollDiceProps) => {
  // 抽選毛化
  const [dice, setDice] = useState<number>(0)

  // 1から6のランダムな整数を返す
  const actRoll = () => {
    const result = Math.floor(Math.random() * 6) + 1
    setDice(result)
    setCurrentStep(prev => prev + result)
  }

  return {
    dice,
    actRoll,
  }
}
