import { FC } from 'react'

import { useProgressBoard } from './useProgressBoard'

import styles from './ProgressBoard.module.scss'

type ProgressBoardProps = {
  addClass?: string[]
}

export const ProgressBoard: FC<ProgressBoardProps> = ({ children, addClass = [] }) => {
  const customClass = Array.isArray(addClass) ? addClass : [addClass]

  const { fieldStepArray, currentStep } = useProgressBoard()

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
