import { FC, ReactNode } from 'react'

import { useProgressBoard } from './useProgressBoard'

import styles from './ProgressBoard.module.scss'

type ProgressBoardProps = {
  addClass?: string[]
}

export const ProgressBoard: FC<ProgressBoardProps> = ({ children, addClass = [] }) => {
  const customClass = Array.isArray(addClass) ? addClass : [addClass]

  const { fieldStep, currentStep } = useProgressBoard()

  // fieldStepの数だけ要素がある配列
  const fieldStepArray = new Array(fieldStep).fill(null)

  return (
    <div className={[styles.progressBoard, ...customClass].join(' ')}>
      <p>
        {fieldStep} /{currentStep}
      </p>
      <div className={styles.list}>
        {fieldStepArray.map((_, index) => (
          <div key={index} className={styles.item}>
            {index + 1}
          </div>
        ))}
      </div>
    </div>
  )
}
