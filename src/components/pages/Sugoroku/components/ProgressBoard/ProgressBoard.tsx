import { FC } from 'react'

import styles from './ProgressBoard.module.scss'

type ProgressBoardProps = {
  course: { event: { checkIn: boolean } | null }[]
  currentStep: number
  addClass?: string[]
}

export const ProgressBoard: FC<ProgressBoardProps> = ({ course, currentStep, addClass = [] }) => {
  const customClass = Array.isArray(addClass) ? addClass : [addClass]

  return (
    <div className={[styles.progressBoard, ...customClass].join(' ')}>
      <div className={styles.list}>
        {course.map((item, index) => {
          const label = index === 0 ? 'START' : index === course.length - 1 ? 'GOAL' : index

          const itemClass = [styles.item]
          if (item.event !== null) itemClass.push(styles[`--event`])
          if (item.event?.checkIn === true) itemClass.push(styles[`--checkIn`])

          return (
            <div key={index} className={[...itemClass].join(' ')}>
              <span className={styles.label}>{label}</span>
              {currentStep === index && <span className={styles.player}></span>}
            </div>
          )
        })}
      </div>
    </div>
  )
}
