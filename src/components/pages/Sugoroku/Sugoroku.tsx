import { FC } from 'react'

import { usePageTitle } from 'hooks/usePageTitle'

import { ProgressBoard } from './components/ProgressBoard'

import { Button } from 'components/parts/Button'

import styles from './Sugoroku.module.scss'
import { useSugoroku } from './useSugoroku.ts'

export const Sugoroku: FC = () => {
  const { fieldStep, currentStep, dice, actRoll, reset } = useSugoroku()

  usePageTitle(`Sugoroku`)

  return (
    <>
      <div className={styles.sugoroku}>
        <>Sugoroku</>
        <div>
          {fieldStep === currentStep ? (
            <Button onClick={reset}>もういちどあそぶ</Button>
          ) : (
            <Button onClick={actRoll}>さいころをふる</Button>
          )}
          <span className={styles.rollResult}>{dice >= 1 && `${dice}がでた`}</span>
          <ProgressBoard fieldStep={fieldStep} currentStep={currentStep} />
        </div>
      </div>
    </>
  )
}
