import { FC } from 'react'

import { usePageTitle } from 'hooks/usePageTitle'

import { ProgressBoard } from './components/ProgressBoard'

import { RollDice } from './components/RollDice/RollDice.tsx'
import styles from './Sugoroku.module.scss'
import { useSugoroku } from './useSugoroku.ts'

export const Sugoroku: FC = () => {
  const { currentStep, setCurrentStep } = useSugoroku()

  usePageTitle(`Sugoroku`)

  return (
    <>
      <div className={styles.sugoroku}>
        <>Sugoroku</>
        <p>{currentStep}</p>
        <RollDice setCurrentStep={setCurrentStep} />
        <ProgressBoard currentStep={currentStep} />
      </div>
    </>
  )
}
