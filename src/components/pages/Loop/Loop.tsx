import { FC } from 'react'

import { usePageTitle } from 'hooks/usePageTitle'

import { Button } from 'components/parts/Button'

import { ProgressBoard } from './components/ProgressBoard/index.ts'
import styles from './Loop.module.scss'
import { useLoop } from './useLoop.ts'

export const Loop: FC = () => {
  const {
    minFieldStep,
    fieldStep,
    course,
    setFieldStep,
    currentStep,
    dice,
    actRoll,
    isFinish,
    reset,
  } = useLoop()

  usePageTitle(`Loop`)

  return (
    <>
      <div className={styles.Loop}>
        <>Loop</>
        <div className={styles.fieldStep}>
          ゴールまで
          <input
            className={styles.fieldStepInput}
            type="number"
            step="1"
            value={fieldStep}
            min={minFieldStep}
            onChange={e => setFieldStep(Number(e.target.value))}
            disabled={currentStep > 0}
          />
          ステップ
        </div>
        <div>
          {isFinish ? (
            <Button onClick={reset}>もういちどあそぶ</Button>
          ) : (
            <Button onClick={actRoll}>さいころをふる</Button>
          )}
          <span className={styles.rollResult}>{dice >= 1 && `${dice}がでた`}</span>
        </div>
        <ProgressBoard fieldStep={fieldStep} currentStep={currentStep} course={course} />
      </div>
      <div>
        <Button onClick={reset}>あたらしくゲームをはじめる</Button>
      </div>
    </>
  )
}
