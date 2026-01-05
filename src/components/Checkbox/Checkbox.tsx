import React, { FC } from 'react'
import cn from 'classnames'
import styles from './Checkbox.module.css'
import { CheckboxProps } from './Checkbox.props'
import { CheckIcon } from './CheckIcon'

export const Checkbox: FC<CheckboxProps> = ({ check, id, handleClick }) => {
  return (
    <div className={styles.container}>
      <input
        id={id}
        type="checkbox"
        defaultChecked={check}
        className={styles.hiddenView}
        onClick={handleClick}
      />
      <label
        htmlFor={id}
        className={cn(styles.activeView, {
          [styles.checkedIcon]: check,
        })}
      >
        <CheckIcon className={cn(styles.icon)} />
      </label>
    </div>
  )
}
