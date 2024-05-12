import { FC } from 'react'

// import { useSelector } from 'react-redux'
// import { RootState } from 'store'

import { usePageTitle } from 'hooks/usePageTitle'

import styles from './Dice.module.scss'
import { useDice } from './useDice.ts'

export const Dice: FC = () => {
  // const { fuga } = useSelector((state: RootState) => state.hoge)

  const { hoge } = useDice()

  usePageTitle(`Dice`)

  return (
    <>
      <div className={styles.dice}>
        <>Dice</>
        <p>{hoge}</p>
      </div>
    </>
  )
}
