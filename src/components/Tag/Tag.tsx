import cn from 'classnames'
import { TagProps } from './Tag.props'

import styles from './Tag.module.css'

export const Tag = ({
  color = 'blue',
  className,
  children,
  ...props
}: TagProps) => {
  return <div className={cn(styles.tag, className)}>{children}</div>
}
