import { FC } from 'react'

import { useRollDice } from './useRollDice'

import { Button } from 'components/parts/Button'

import styles from './RollDice.module.scss'

type RollDiceProps = {
  addClass?: string[]
  integrationRollResult: (step: number) => void
}

export const RollDice: FC<RollDiceProps> = ({ integrationRollResult, addClass = [] }) => {
  const customClass = Array.isArray(addClass) ? addClass : [addClass]

  const { dice, actRoll } = useRollDice({ integrationRollResult })

  return (
    <div className={[styles.rollDice, ...customClass].join(' ')}>
      <p>{dice}</p> <Button onClick={actRoll}>さいころをふる</Button>
    </div>
  )
}
