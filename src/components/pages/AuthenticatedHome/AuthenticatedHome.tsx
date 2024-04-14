import { FC } from 'react'

// import { useSelector } from 'react-redux'
// import { RootState } from 'store'

import { usePageTitle } from 'hooks/usePageTitle'

import styles from './AuthenticatedHome.module.scss'

export const AuthenticatedHome: FC = () => {
  // const { fuga } = useSelector((state: RootState) => state.hoge)

  usePageTitle(`AuthenticatedHome`)

  return (
    <>
      <div className={styles.authenticatedHome}>
        <>AuthenticatedHome</>
      </div>
    </>
  )
}
