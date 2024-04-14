import { useState, useEffect, useCallback } from 'react'

export const useSugoroku = () => {
  // チェックインイベントのあるマスの数
  const checkInEventCount = 8
  const [checkInEvent, setCheckInEvent] = useState<boolean[]>(
    new Array(checkInEventCount).fill(false)
  )

  // このコースの下限
  // 可視化されているマスの数 + GOAL（1マス）の値が最低限必要なステップ数
  const minFieldStep = checkInEventCount + 1

  // このコースの長さ
  const [fieldStep, setFieldStep] = useState<number>(minFieldStep)

  // コース情報
  // 最初の要素0をスタートマスにするため、+1する
  const [course, setCourse] = useState<{ event: { checkIn: boolean } | null }[]>(
    new Array(fieldStep + 1).fill({ event: null })
  )

  // コースのステップ数へのチェックポイントを均等に割り当てる
  const setEventTarget = useCallback(() => {
    // fieldStepにはゴールを含んでいるので、ゴールを除いた数だけイベントを設置可能なマスがある
    const showFieldStep = fieldStep - 1

    const interval = showFieldStep / checkInEventCount
    const eventTarget = new Set<number>()
    for (let i = 0; i < checkInEventCount; i++) eventTarget.add(Math.round(i * interval) + 1) // startが0なので+1する

    const updateCourse = new Array(fieldStep + 1).fill({ event: null }).map((item, index) => {
      if (eventTarget.has(index)) return { event: { checkIn: false } }
      return item
    })

    return updateCourse
  }, [fieldStep])

  // イベントがあるマスを均等に配置する場合の位置情報
  useEffect(() => {
    // スタートとゴールの間へ設置するポイントの数
    // fieldStepにはゴールを含んでいるので、ゴールを除いた数だけイベントを設置可能なマスがある
    const showFieldStep = fieldStep - 1

    // コースのステップ数へのチェックポイントを均等に割り当てる
    const interval = showFieldStep / checkInEventCount
    const eventTarget = new Set<number>()
    for (let i = 0; i < checkInEventCount; i++) eventTarget.add(Math.round(i * interval) + 1) // startが0なので+1する

    const updateCourse = setEventTarget()

    setCourse(updateCourse)
  }, [fieldStep, checkInEventCount])

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
      // 目的地
      const nextStep = prev + addStep
      // ゴールを超えた場合はゴールに到達
      const finalStep = nextStep > fieldStep ? fieldStep : nextStep

      // 目的地にイベントがある場合はイベントを発生させる
      if (course[finalStep].event) {
        // チェックインイベントがある場合はチェックインを行う
        if (course[finalStep].event !== null) {
          setCourse(prev => {
            const update = [...prev]
            update[finalStep] = { event: { checkIn: true } }
            return update
          })
        }
      }

      return finalStep
    })
  }

  // リセット処理
  const reset = () => {
    setCurrentStep(0)
    setDice(0)
    setCourse(setEventTarget())
  }

  return {
    minFieldStep,
    fieldStep,
    checkInEvent,
    setCheckInEvent,
    course,
    setFieldStep,
    currentStep,
    dice,
    actRoll,
    reset,
  }
}
