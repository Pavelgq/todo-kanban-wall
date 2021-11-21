import cn from 'classnames'
import { DeleteButtonProps } from './DeleleButton.props'
import styles from './DeleteButton.module.css'

export const DeleteButton = ({
  handleClick,
  className,
  ...prors
}: DeleteButtonProps): JSX.Element => {
  return (
    <button
      type="submit"
      className={cn(className, styles.delete)}
      onClick={handleClick}
      {...prors}
    />
  )
}
