import { FC } from 'react'

// import { useSelector } from 'react-redux'
// import { RootState } from 'store'

import { usePageTitle } from 'hooks/usePageTitle'

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
        <p>{hoge}</p>
      </div>
    </>
  )
}
