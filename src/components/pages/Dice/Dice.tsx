import { FC, useRef, useEffect } from 'react'

import { usePageTitle } from 'hooks/usePageTitle'

import styles from './Dice.module.scss'
import { useDice } from './useDice.ts'

export const Dice: FC = () => {
  const { renderer } = useDice()

  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mountRef.current) return

    // 描画領域を定義し、DOM に追加
    mountRef.current.appendChild(renderer.domElement)

    return () => {
      // アンマウント時にレンダラーを削除
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement)
        renderer.dispose()
      }
    }
  }, [])

  usePageTitle(`Dice`)

  return (
    <>
      <div className={styles.canvas} ref={mountRef}></div>
    </>
  )
}
