import { useState, useMemo } from 'react'

export const useSugoroku = () => {
  // チェックインイベントのあるマスの数
  const checkInEvent = 8

  // このコースの下限
  // スタートの次のマスがゴールになると必ずゲームが終わる。可視化されているマスの数 + GOAL（1マス）の値が最低限必要なステップ数
  const minFieldStep = checkInEvent + 1

  // このコースの長さ
  const [fieldStep, setFieldStep] = useState<number>(minFieldStep)

  /**
   * @description コースのステップ数へのチェックポイントを均等に割り当てる
   * @param N
   * @param checkpoints
   * @returns boolean[]
   */
  const assignCheckpoints = (N: number, checkpoints: number): Set<number> => {
    const interval = N / checkpoints
    const result = new Set<number>()

    for (let i = 0; i < checkpoints; i++) {
      result.add(Math.round(i * interval))
    }
    return result
  }

  // イベントがあるマスを均等に配置する場合の位置情報
  const fieldEvent = useMemo((): Set<number> => {
    // スタートとゴールの間へ設置するポイントの数
    // fieldStepにはゴールを含んでいるので、ゴールを除いた数だけイベントを設置可能なマスがある
    const showFieldStep = fieldStep - 1

    // コースのステップ数へのチェックポイントを均等に割り当てる
    const interval = showFieldStep / checkInEvent
    const result = new Set<number>()

    for (let i = 0; i < checkInEvent; i++) {
      result.add(Math.round(i * interval))
    }

    return result
  }, [fieldStep, checkInEvent])

  // コマの現在地
  const [currentStep, setCurrentStep] = useState<number>(0)

  // 抽選結果
  const [dice, setDice] = useState<number>(0)

  // さいころをふる
  const actRoll = () => {
    // ランダムに1から6のランダムな整数を返す
    const addStep = Math.floor(Math.random() * 6) + 1
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
    minFieldStep,
    fieldStep,
    fieldEvent,
    setFieldStep,
    currentStep,
    dice,
    actRoll,
    reset,
  }
}
