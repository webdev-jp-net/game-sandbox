import { FC } from 'react'

import { useProgressBoard } from './useProgressBoard'

// import courseJson from './course.json'
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
  const { fieldStepPosition, lap, currentCourse } = useProgressBoard({
    fieldStep: 11,
    course,
    currentStep,
  })

  // const { a, b, c, d } = courseJson

  return (
    <div className={[styles.progressBoard, ...customClass].join(' ')}>
      <div className={styles.lap}>
        {lap + 1}周め
        <br />
        {currentStep}
      </div>
      <div className={styles.list}>
        {currentCourse.map((item, index) => {
          const label = index === 0 ? 'S' : index === course.length - 1 ? 'G' : index

          const itemClass = [styles.item]
          if (item.event !== null) itemClass.push(styles[`--event`])
          if (course[11 * lap + index].event?.checkIn === true) itemClass.push(styles[`--checkIn`])

          const { x, y } = fieldStepPosition[index]

          const hoge = currentStep === index + 11 * lap

          // if (item.empty) return
          // else
          return (
            <div
              key={index}
              className={[...itemClass].join(' ')}
              style={{ transform: `translate(${x * 0.1}rem, ${y * 0.1}rem)` }}
            >
              <span className={styles.label}>{11 * lap + index}</span>
              {currentStep === index + 11 * lap && <span className={styles.player}></span>}
            </div>
          )
        })}
      </div>
    </div>
  )
}
