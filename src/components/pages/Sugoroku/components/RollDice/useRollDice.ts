import { useState } from 'react'

export const useRollDice = () => {
  // 抽選毛化
  const [dice, setDice] = useState<number>(1)

  // 1から6のランダムな整数を返す
  const actRoll = () => {
    setDice(Math.floor(Math.random() * 6) + 1)
  }

  return {
    dice,
    actRoll,
  }
}
