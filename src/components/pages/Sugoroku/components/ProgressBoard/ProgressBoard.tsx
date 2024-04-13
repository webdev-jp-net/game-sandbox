import { FC } from 'react'

import { useProgressBoard } from './useProgressBoard'

import styles from './ProgressBoard.module.scss'

type ProgressBoardProps = {
  currentStep: number
  addClass?: string[]
}

export const ProgressBoard: FC<ProgressBoardProps> = ({ currentStep, addClass = [] }) => {
  const customClass = Array.isArray(addClass) ? addClass : [addClass]

  const { fieldStepArray } = useProgressBoard()

  return (
    <div className={[styles.progressBoard, ...customClass].join(' ')}>
      <div className={styles.list}>
        {fieldStepArray.map((item, index) => (
          <div key={index} className={styles.item}>
            <span className={styles.label}>{item}</span>
            {currentStep === index && <span className={styles.player}></span>}
          </div>
        ))}
      </div>
    </div>
  )
}
