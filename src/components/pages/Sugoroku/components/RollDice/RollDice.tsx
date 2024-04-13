import { FC } from 'react'

import { useRollDice } from './useRollDice'

import { Button } from 'components/parts/Button'

import styles from './RollDice.module.scss'

type RollDiceProps = {
  addClass?: string[]
  setCurrentStep: (step: number) => void
}

export const RollDice: FC<RollDiceProps> = ({ setCurrentStep, addClass = [] }) => {
  const customClass = Array.isArray(addClass) ? addClass : [addClass]

  const { dice, actRoll } = useRollDice({ setCurrentStep })

  return (
    <div className={[styles.rollDice, ...customClass].join(' ')}>
      <p>{dice}</p> <Button onClick={actRoll}>さいころをふる</Button>
    </div>
  )
}
