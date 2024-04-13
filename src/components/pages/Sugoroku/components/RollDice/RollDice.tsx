import { FC, ReactNode } from 'react'

import { useRollDice } from './useRollDice'

import { Button } from 'components/parts/Button'

import styles from './RollDice.module.scss'

type RollDiceProps = {
  children?: ReactNode
  addClass?: string[]
}

export const RollDice: FC<RollDiceProps> = ({ children, addClass = [] }) => {
  const customClass = Array.isArray(addClass) ? addClass : [addClass]

  const { dice, actRoll } = useRollDice()
  return (
    <div className={[styles.rollDice, ...customClass].join(' ')}>
      <p>{dice}</p> <Button onClick={actRoll}>さいころをふる</Button>
      {children}
    </div>
  )
}
