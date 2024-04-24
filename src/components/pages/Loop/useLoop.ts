import { useState, useEffect, useCallback } from 'react'

type CourseItem = { event: { checkIn: boolean } | null; empty: boolean }

export const useLoop = () => {
  // チェックインイベントのあるマスの数
  const checkInEventCount = 8
  const [checkInEvent, setCheckInEvent] = useState<{ position: number; done: boolean }[]>(
    new Array(checkInEventCount).fill({ position: 0, done: false })
  )

  // このコースの下限
  // 可視化されているマスの数 + GOAL（1マス）の値が最低限必要なステップ数
  const minFieldStep = 11

  // このコースの長さ
  const [fieldStep, setFieldStep] = useState<number>(minFieldStep * 4)

  // コース情報
  // 最初の要素0をスタートマスにするため、+1する
  const [course, setCourse] = useState<CourseItem[]>(
    new Array(fieldStep + 1).fill({ event: null, empty: false })
  )

  // コース全体の中のイベント場所
  // [1, 2, 4, 5, 7, 8, 10, 11] を4つのグループに分ける
  const eventTargetAllFlat = [2, 10, 4 + 11, 8 + 11, 1 + 22, 7 + 22, 5 + 33, 11 + 33]
  const eventTargetAll = [
    [2, 10],
    [4, 8],
    [1, 7],
    [5, 11],
  ]

  // コースのステップ数へのチェックポイントを均等に割り当てる
  const setEventTarget = useCallback(() => {
    const eventTarget = new Set<number>(eventTargetAllFlat)

    const updateCourse = new Array(fieldStep + 1)
      .fill({ event: null, empty: false })
      .map((item, index) => {
        if (eventTarget.has(index)) return { event: { checkIn: false }, empty: false }
        return item
      })

    return updateCourse
  }, [fieldStep])

  // イベントがあるマスを均等に配置する場合の位置情報
  useEffect(() => {
    // イベントマスのコンディションを管理する箱へパラメータを割り当てる
    eventTargetAllFlat.forEach((item, index) => {
      setCheckInEvent(prev => {
        const update = [...prev]
        update[index] = { position: item, done: false }

        return update
      })
    })

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

  // クリア判定
  const [isFinish, setIsFinish] = useState<boolean>(false)

  // さいころをふる
  const actRoll = () => {
    // ランダムに1から6のランダムな整数を返す
    const addStep = Math.floor(Math.random() * 6) + 1
    setDice(addStep)

    // コマの現在地を進める
    setCurrentStep(prev => {
      // 目的地
      let nextStep = prev + addStep

      // イベントがある場合は通り抜けない
      // 最寄りのイベントマス座標
      const nextEventTarget = eventTargetAllFlat.find(item => item > prev)
      if (nextEventTarget && nextEventTarget < nextStep) nextStep = nextEventTarget

      // ゴールを超えた場合はゴールに到達
      // const finalStep = nextStep > fieldStep ? fieldStep : nextStep

      // ゴールを超えた場合はスタートに戻り超えた分だけ進む
      const finalStep = nextStep > fieldStep - 1 ? nextStep - fieldStep : nextStep

      // 目的地にイベントがある場合はイベントを発生させる
      if (course[finalStep].event) {
        // チェックインイベントがある場合はチェックインを行う
        if (course[finalStep].event !== null) {
          setCourse(prev => {
            const update = [...prev]
            update[finalStep] = { event: { checkIn: true } }

            // 全てのチェックインが完了しているならばゲームクリア
            setIsFinish(
              checkInEventCount === update.filter(item => item.event?.checkIn === true).length
            )
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
    setIsFinish(false)
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
    isFinish,
    reset,
  }
}
