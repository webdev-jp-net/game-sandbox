import { FC } from 'react'

import { usePageTitle } from 'hooks/usePageTitle'

import { ProgressBoard } from './components/ProgressBoard'
// import { useSelector } from 'react-redux'
// import { RootState } from 'store'

import { RollDice } from './components/RollDice/RollDice.tsx'
import styles from './Sugoroku.module.scss'
import { useSugoroku } from './useSugoroku.ts'

export const Sugoroku: FC = () => {
  // const { fuga } = useSelector((state: RootState) => state.hoge)

  const { hoge } = useSugoroku()

  usePageTitle(`Sugoroku`)

  return (
    <>
      <div className={styles.sugoroku}>
        <>Sugoroku</>
        <RollDice />
        <ProgressBoard />
      </div>
    </>
  )
}
