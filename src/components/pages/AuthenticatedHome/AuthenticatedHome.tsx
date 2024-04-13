import { FC } from 'react'

// import { useSelector } from 'react-redux'
// import { RootState } from 'store'

import { usePageTitle } from 'hooks/usePageTitle'

import styles from './AuthenticatedHome.module.scss'
import { useAuthenticatedHome } from './useAuthenticatedHome.ts'

export const AuthenticatedHome: FC = () => {
  // const { fuga } = useSelector((state: RootState) => state.hoge)

  const { hoge } = useAuthenticatedHome()

  usePageTitle(`AuthenticatedHome`)

  return (
    <>
      <div className={styles.authenticatedHome}>
        <>AuthenticatedHome</>
      </div>
    </>
  )
}
