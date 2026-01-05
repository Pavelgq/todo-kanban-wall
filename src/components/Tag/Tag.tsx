import React, { FC } from 'react'
import cn from 'classnames'
import { TagProps } from './Tag.props'

import styles from './Tag.module.css'

export const Tag: FC<TagProps> = ({
  color = 'blue',
  className,
  children,
  onRemove,
  ...props
}) => {
  return (
    <div className={cn(styles.tag, styles[color], className)} {...props}>
      <span className={styles.tagText}>{children}</span>
      {onRemove && (
        <button
          type="button"
          className={styles.removeButton}
          onClick={(e) => {
            e.stopPropagation()
            onRemove()
          }}
          aria-label="Удалить тег"
        >
          ×
        </button>
      )}
    </div>
  )
}
