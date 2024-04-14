import { FC } from 'react'

import { usePageTitle } from 'hooks/usePageTitle'

import { ProgressBoard } from './components/ProgressBoard'

import { Button } from 'components/parts/Button'

import styles from './Sugoroku.module.scss'
import { useSugoroku } from './useSugoroku.ts'

export const Sugoroku: FC = () => {
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
  } = useSugoroku()

  usePageTitle(`Sugoroku`)

  return (
    <>
      <div className={styles.sugoroku}>
        <>Sugoroku</>
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
