import cn from 'classnames'
import { ReactComponent as CheckIcon } from './check.svg'
import styles from './Checkbox.module.css'
import { CheckboxProps } from './Checkbox.props'

export const Checkbox = ({
  check,
  id,
  handleClick,
  ...props
}: CheckboxProps): JSX.Element => {
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
