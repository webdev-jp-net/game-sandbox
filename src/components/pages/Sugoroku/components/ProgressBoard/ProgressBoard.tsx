import { FC } from 'react'

import { useProgressBoard } from './useProgressBoard'

import styles from './ProgressBoard.module.scss'

type ProgressBoardProps = {
  fieldStep: number
  course: { event: { checkIn: boolean } | null }[]
  currentStep: number
  addClass?: string[]
}

export const ProgressBoard: FC<ProgressBoardProps> = ({
  fieldStep,
  course,
  currentStep,
  addClass = [],
}) => {
  const customClass = Array.isArray(addClass) ? addClass : [addClass]
  const { fieldStepPosition } = useProgressBoard({ fieldStep })

  console.log({ course })

  return (
    <div className={[styles.progressBoard, ...customClass].join(' ')}>
      <div className={styles.list}>
        {course.map((item, index) => {
          const label = index === 0 ? 'START' : index === course.length - 1 ? 'GOAL' : index

          const itemClass = [styles.item]
          if (item.event !== null) itemClass.push(styles[`--event`])
          if (item.event?.checkIn === true) itemClass.push(styles[`--checkIn`])

          const { x, y } = fieldStepPosition[index]

          return (
            <div
              key={index}
              className={[...itemClass].join(' ')}
              style={{ transform: `translate(${x * 0.1}rem, ${y * 0.1}rem)` }}
            >
              <span className={styles.label}>{label}</span>
              {currentStep === index && <span className={styles.player}></span>}
            </div>
          )
        })}
      </div>
    </div>
  )
}
