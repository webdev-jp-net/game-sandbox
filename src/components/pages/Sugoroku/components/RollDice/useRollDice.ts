import { useState, useEffect } from 'react'

type useRollDiceProps = {
  integrationRollResult: (step: number) => void
}

export const useRollDice = ({ integrationRollResult }: useRollDiceProps) => {
  // 抽選毛化
  const [dice, setDice] = useState<number>(0)

  // 1から6のランダムな整数を返す
  const actRoll = () => {
    const result = Math.floor(Math.random() * 6) + 1
    setDice(result)
  }

  // diceに変化があった場合にactRollを実行
  useEffect(() => {
    integrationRollResult(dice)
  }, [dice])

  return {
    dice,
    actRoll,
  }
}
