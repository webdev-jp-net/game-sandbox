import { useState, useEffect, useMemo } from 'react'

type useProgressBoardProps = {
  fieldStep: number
  course: { event: { checkIn: boolean } | null }[]
  currentStep: number
}

export const useProgressBoard = ({ fieldStep, course, currentStep }: useProgressBoardProps) => {
  const [fieldStepPosition, setFieldStepPosition] = useState<{ x: number; y: number }[]>(
    new Array(fieldStep + 1).fill({ x: 0, y: 100 })
  )

  // フィールドステップの中心点からの相対位置を算出
  const calcFieldStepPosition = () => {
    const fieldStepPosition = [{ x: 0, y: -100 }]

    const R = 100 // 半径
    for (let i = 0; i < fieldStep; i++) {
      const angle = (2 * Math.PI * (i + 1)) / fieldStep - Math.PI / 2 // 上中央からの配置
      fieldStepPosition.push({
        x: Math.round(R * Math.cos(angle)),
        y: Math.round(R * Math.sin(angle)),
      })
    }

    return fieldStepPosition
  }

  // 角度を算出
  useEffect(() => {
    setFieldStepPosition(calcFieldStepPosition())
  }, [fieldStep])

  // course を均等に4分割し。currentStepが属しているグループをcurentGroupとして取得
  const groupLength = course.length / 4
  const lap = useMemo(() => Math.floor(currentStep / groupLength), [currentStep])
  const currentCourse = useMemo(
    () => course.slice(lap * groupLength, (lap + 1) * groupLength),
    [lap]
  )

  return {
    fieldStepPosition,
    lap,
    currentCourse,
  }
}
