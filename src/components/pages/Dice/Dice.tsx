import { FC, useRef } from 'react'

import { usePageTitle } from 'hooks/usePageTitle'

import styles from './Dice.module.scss'
import { useDice } from './useDice.ts'

export const Dice: FC = () => {
  const canvasWrapper = useRef<HTMLDivElement>(null)
  const {} = useDice({ canvasWrapper })

  usePageTitle(`Dice`)

  return (
    <>
      <div className={styles.canvas} ref={canvasWrapper}></div>
    </>
  )
}
