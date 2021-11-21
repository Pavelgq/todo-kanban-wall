import cn from 'classnames'
import { SortProps } from './Sort.props'

import styles from './Sort.module.css'

export const Sort = ({ sort, setSort, className }: SortProps): JSX.Element => {
  return (
    <div className={cn(styles.sort, className)}>
      <button
        type="button"
        className={cn(styles.item, {
          [styles.active]: sort === 0,
        })}
        onClick={() => setSort(0)}
      >
        Все
      </button>
      <button
        type="button"
        className={cn(styles.item, {
          [styles.active]: sort === 1,
        })}
        onClick={() => setSort(1)}
      >
        Активные
      </button>
      <button
        type="button"
        className={cn(styles.item, {
          [styles.active]: sort === 2,
        })}
        onClick={() => setSort(2)}
      >
        Завершенные
      </button>
    </div>
  )
}
