import { FC, ReactNode } from 'react'

import { Button } from 'components/parts/Button'

import styles from './RollDice.module.scss'

type RollDiceProps = {
  children?: ReactNode
  addClass?: string[]
}

export const RollDice: FC<RollDiceProps> = ({ children, addClass = [] }) => {
  const customClass = Array.isArray(addClass) ? addClass : [addClass]
  return (
    <div className={[styles.rollDice, ...customClass].join(' ')}>
      <Button>さいころをふる</Button>
      {children}
    </div>
  )
}
