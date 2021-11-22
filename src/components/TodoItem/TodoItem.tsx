import cn from 'classnames'
import { useDispatch, useSelector } from 'react-redux'
import { Checkbox } from '../Checkbox/Checkbox'
import { DeleteButton } from '../DeleteButton/DeleteButton'
import { Editor } from '../Editor/Editor'
import {
  deleteTodo,
  selectTodo,
  checkTodo,
  editTodoDescription,
} from './todoSlice'
import { ReactComponent as CheckIcon } from './check.svg'
import styles from './TodoItem.module.css'
import { TodoItemProps } from './TodoItem.props'

export const TodoItem = ({
  description,
  tags,
  color,
  check,
  id,
  listId,
}: TodoItemProps): JSX.Element => {
  const state = useSelector(selectTodo)
  const dispatch = useDispatch()

  const deleteTodoItem = () => {
    dispatch(deleteTodo(id))
  }
  const checkTodoItem = () => {
    dispatch(checkTodo(id))
  }
  const editTodo = (newText: string) => {
    const editedTask: TodoItemProps = {
      id,
      check,
      color,
      tags,
      listId,
      description: newText,
    }
    dispatch(editTodoDescription(editedTask))
  }
  return (
    <>
      <li
        className={cn(styles.item, {
          [styles.complite]: check,
        })}
      >
        <div className={styles.wrapper}>
          <Checkbox id={id} check={check} handleClick={checkTodoItem} />
          <Editor
            oldValue={description}
            changeValue={editTodo}
            className={styles.editor}
          >
            <span className={styles.todoDesctiption}>{description}</span>
          </Editor>

          <DeleteButton
            className={styles.delButton}
            handleClick={deleteTodoItem}
          />
        </div>
      </li>
    </>
  )
}
