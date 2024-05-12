import { FC, useRef } from 'react'

import { usePageTitle } from 'hooks/usePageTitle'

import styles from './Dice.module.scss'
import { useDice } from './useDice.ts'

export const Dice: FC = () => {
  const canvas = useRef<HTMLCanvasElement>(null)
  const { result } = useDice({ canvas })

  usePageTitle(`Dice`)

  return (
    <>
      <div className={styles.canvas}>
        <p className={styles.result}>{result}</p>
        <canvas ref={canvas} id="canvas"></canvas>
      </div>
    </>
  )
}
