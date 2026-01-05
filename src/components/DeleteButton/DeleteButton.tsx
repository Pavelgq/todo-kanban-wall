import React, { FC } from 'react'
import cn from 'classnames'
import { DeleteButtonProps } from './DeleteButton.props'
import styles from './DeleteButton.module.css'

export const DeleteButton: FC<DeleteButtonProps> = ({
  handleClick,
  className,
  ...prors
}) => {
  return (
    <button
      type="submit"
      className={cn(className, styles.delete)}
      onClick={handleClick}
      {...prors}
    />
  )
}
