import { FC } from 'react'

import { usePageTitle } from 'hooks/usePageTitle'

import { Button } from 'components/parts/Button'

import { ProgressBoard } from './components/ProgressBoard/index.ts'
import styles from './Loop.module.scss'
import { useLoop } from './useLoop.ts'

export const Loop: FC = () => {
  const { fieldStep, course, currentStep, dice, actRoll, isFinish, reset } = useLoop()

  usePageTitle(`Loop`)

  return (
    <>
      <div className={styles.Loop}>
        <>Loop</>
        <div className={styles.header}>
          {isFinish ? (
            <Button onClick={reset}>もういちどあそぶ</Button>
          ) : (
            <Button onClick={actRoll}>さいころをふる</Button>
          )}
          <span className={styles.rollResult}>{dice >= 1 && `${dice}がでた`}</span>
        </div>
        <ProgressBoard fieldStep={fieldStep} currentStep={currentStep} course={course} />
      </div>
      <div className={styles.footer}>
        <Button onClick={reset}>あたらしくゲームをはじめる</Button>
      </div>
    </>
  )
}
