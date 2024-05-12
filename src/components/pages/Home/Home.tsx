import { FC } from 'react'

import { useSelector } from 'react-redux'

import { Link } from 'react-router-dom'

import { RootState } from 'store'

import { usePageTitle } from 'hooks/usePageTitle'

import styles from './Home.module.scss'

export const Home: FC = () => {
  const { userId } = useSelector((state: RootState) => state.user)

  // ページタイトル
  usePageTitle(`Game Sandbox`)

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Game Sandbox</h1>
        <figure className={styles.figure}>
          <img className={styles.image} src="/logo512.png" alt="" />
        </figure>
      </div>
      <div className={styles.body}>
        <p className={styles.paragraph}>{userId}</p>
        <p className={styles.paragraph}>
          <Link to="/sugoroku">Sugoroku</Link>
        </p>
        <p className={styles.paragraph}>
          <Link to="/loop">周回すごろく</Link>
        </p>
        <p className={styles.paragraph}>
          <Link to="/dice">ダイス</Link>
        </p>
      </div>
    </div>
  )
}
