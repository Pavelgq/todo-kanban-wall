import React, { FC } from 'react'

import cn from 'classnames'
import styles from './Button.module.css'
import { ButtonProps } from './Button.props'
import { ArrowIcon } from './ArrowIcon'

export const Button: FC<ButtonProps> = ({
  appearence,
  children,
  arrow = 'none',
  className,
  ...props
}) => {
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
