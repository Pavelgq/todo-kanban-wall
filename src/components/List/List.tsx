import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
import { Input, TodoItem, Card, Sort, Editor, Button } from '..'
import { SortEnam } from '../Sort/Sort.props'
import { TodoItemProps } from '../TodoItem/TodoItem.props'
import { addNewTodo, selectTodo } from '../TodoItem/todoSlice'
import { declinWord } from '../../helpers/otherHelpers'

import styles from './List.module.css'
import { ListProps } from './List.props'
import { changeTitle, deleteList } from './listSlice'

export const List = ({ title, id, className }: ListProps): JSX.Element => {
  const [inputValue, setInputValue] = useState<string>('')
  const [sortType, setSortType] = useState<SortEnam>(0)
  const [sortState, setSortState] = useState<TodoItemProps[]>([])

  const state = useSelector(selectTodo)
  const dispatch = useDispatch()

  const addMyTodo = () => {
    const newTodo: TodoItemProps = {
      description: inputValue,
      check: false,
      color: 'white',
      tags: ['first'],
      id: uuidv4(),
      listId: id,
    }
    dispatch(addNewTodo(newTodo))
    setInputValue('')
  }

  const handleKeyDown = (event: any) => {
    if (event.key === 'Enter' && inputValue) {
      addMyTodo()
    }
  }
  const changeSort = (s: SortEnam) => {
    setSortType(s)
  }

  const changeListTitle = (newTitle: string) => {
    const obj = {
      title: newTitle,
      id,
    }
    dispatch(changeTitle(obj))
  }

  useEffect(() => {
    const newState = state.filter((t) => t.listId === id)
    switch (sortType) {
      case 0:
        setSortState(newState)
        break
      case 1:
        setSortState(newState.filter((t) => !t.check))
        break
      case 2:
        setSortState(newState.filter((t) => t.check))
        break
      default:
        setSortState(newState)
    }
  }, [state, sortType, id])

  return (
    <div className={className}>
      <Card className={styles.card}>
        <Editor oldValue={title} changeValue={changeListTitle}>
          <h2 className={styles.title}>{title}</h2>
        </Editor>
        <div className={styles.infoPanel}>
          <span>
            {sortState.length}{' '}
            {declinWord(state.length, ['задачи', 'задача', 'задач'])}
          </span>
          <Sort sort={sortType} setSort={changeSort} />
        </div>
        <Input
          className={styles.addInput}
          placeholder="Введите..."
          value={inputValue}
          onChange={({ target }) => setInputValue(target.value)}
          onKeyDown={handleKeyDown}
        />
        <ul className={styles.list}>
          {sortState.length ? (
            sortState.map((t) => <TodoItem key={t.id} {...t} />)
          ) : (
            <span className={styles.empty}>Тут ничего нет...</span>
          )}
        </ul>
      </Card>

      <Button
        className={styles.deleteButton}
        appearence="delete"
        onClick={() => dispatch(deleteList(id))}
      >
        Удалить список
      </Button>
    </div>
  )
}
