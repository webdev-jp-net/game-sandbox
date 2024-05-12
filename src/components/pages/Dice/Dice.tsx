import { FC, useRef } from 'react'

import { usePageTitle } from 'hooks/usePageTitle'

import { Button } from 'components/parts/Button'

import styles from './Dice.module.scss'
import { useDice } from './useDice.ts'

export const Dice: FC = () => {
  const canvas = useRef<HTMLCanvasElement>(null)
  const { result, throwDice } = useDice({ canvas })

  usePageTitle(`Dice`)

  return (
    <>
      <div className={styles.canvas}>
        <p className={styles.result}>{result}</p>
        <Button onClick={throwDice}>Roll</Button>
        <canvas ref={canvas} id="canvas"></canvas>
      </div>
    </>
  )
}
