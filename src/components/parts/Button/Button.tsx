import { FC, ReactNode } from 'react'

import styles from './Button.module.scss'

type ButtonProps = JSX.IntrinsicElements['button'] & {
  children: ReactNode
  variant?: 'basic' | 'minor'
  addClass?: string[] | string
}

export const Button: FC<ButtonProps> = ({
  children,
  variant = 'basic',
  addClass = [],
  type = 'button',
  disabled,
  onClick,
}) => {
  const customClass = Array.isArray(addClass) ? addClass : [addClass]
  if (variant === 'basic') customClass.push(styles['--basic'])
  return (
    <button
      className={[styles.button, ...customClass].join(' ')}
      disabled={disabled}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  )
}
