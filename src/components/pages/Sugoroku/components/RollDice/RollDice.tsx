import { FC, ReactNode } from 'react'

import styles from './RollDice.module.scss'

type RollDiceProps = {
  children?: ReactNode
  addClass?: string[]
}

export const RollDice: FC<RollDiceProps> = ({ children, addClass = [] }) => {
  const customClass = Array.isArray(addClass) ? addClass : [addClass]
  return (
    <div className={[styles.rollDice, ...customClass].join(' ')}>
      <>RollDice</>
      {children && children}
    </div>
  )
}
