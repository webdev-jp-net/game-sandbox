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
    <span className={[styles.rollDice, ...customClass].join(' ')}>
      <Button onClick={actRoll}>さいころをふる</Button> <span>{dice > 1 && `${dice}がでた`}</span>
    </span>
  )
}
