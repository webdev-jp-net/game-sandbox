import { FC } from 'react'

import { usePageTitle } from 'hooks/usePageTitle'

import { ProgressBoard } from './components/ProgressBoard'

import { Button } from 'components/parts/Button'

import { RollDice } from './components/RollDice/RollDice.tsx'
import styles from './Sugoroku.module.scss'
import { useSugoroku } from './useSugoroku.ts'

export const Sugoroku: FC = () => {
  const { fieldStep, currentStep, integrationRollResult } = useSugoroku()

  usePageTitle(`Sugoroku`)

  return (
    <>
      <div className={styles.sugoroku}>
        <>Sugoroku</>
        <div>
          {fieldStep === currentStep ? (
            <Button onClick={() => window.location.reload()}>もういちどあそぶ</Button>
          ) : (
            <RollDice integrationRollResult={integrationRollResult} />
          )}
          <ProgressBoard fieldStep={fieldStep} currentStep={currentStep} />
        </div>
      </div>
    </>
  )
}
