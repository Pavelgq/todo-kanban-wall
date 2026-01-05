import React, { FC } from 'react'
import cn from 'classnames'
import styles from './Card.module.css'
import { CardProps } from './Card.props'

export const Card: FC<CardProps> = ({
  color = 'white',
  children,
  className,
  ...prors
}) => {
  return (
    <div
      className={cn(className, styles.card, {
        [styles.blue]: color === 'blue',
      })}
      {...prors}
    >
      {children}
    </div>
  )
}
