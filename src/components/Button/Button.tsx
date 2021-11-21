import React from 'react'

import cn from 'classnames'
import styles from './Button.module.css'
import { ButtonProps } from './Button.props'

import ArrowIcon from './arrow.svg'

export const Button = ({
  appearence,
  children,
  arrow = 'none',
  className,
  ...props
}: ButtonProps): JSX.Element => {
  return (
    <button
      type="button"
      className={cn(styles.button, className, {
        [styles.primary]: appearence === 'primary',
        [styles.ghost]: appearence === 'ghost',
        [styles.delete]: appearence === 'delete',
      })}
      {...props}
    >
      {children}
      {arrow !== 'none' && (
        <span
          className={cn(styles.arrow, {
            [styles.arrowDown]: arrow === 'down',
          })}
        >
          <ArrowIcon />
        </span>
      )}
    </button>
  )
}
