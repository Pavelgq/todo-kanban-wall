import React, { FC, useEffect, useState, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
import { useDroppable } from '@dnd-kit/core'
import cn from 'classnames'
import { Input, TodoItem, Card, Sort, Editor, Button, Tag } from '..'
import { SortEnam } from '../Sort/Sort.props'
import { TodoItemProps } from '../TodoItem/TodoItem.props'
import { addNewTodo, selectTodo } from '../TodoItem/todoSlice'
import { declinWord } from '../../helpers/otherHelpers'

import styles from './List.module.css'
import { ListProps } from './List.props'
import { changeTitle, deleteList } from './listSlice'

const tagColors: Array<'blue' | 'red' | 'yellow' | 'green' | 'purple' | 'orange'> = [
  'blue',
  'red',
  'yellow',
  'green',
  'purple',
  'orange',
]

export const List: FC<ListProps> = ({ title, id, className }) => {
  const [inputValue, setInputValue] = useState<string>('')
  const [sortType, setSortType] = useState<SortEnam>(0)
  const [sortState, setSortState] = useState<TodoItemProps[]>([])
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  const state = useSelector(selectTodo)
  const dispatch = useDispatch()

  const { setNodeRef, isOver } = useDroppable({
    id: `list-${id}`,
  })

  const listTasks = useMemo(
    () => state.filter((t) => t.listId === id),
    [state, id]
  )

  const availableTags = useMemo(() => {
    const tagsSet = new Set<string>()
    listTasks.forEach((task) => {
      if (task.tags) {
        task.tags.forEach((tag) => tagsSet.add(tag))
      }
    })
    return Array.from(tagsSet).sort()
  }, [listTasks])

  const getTagColor = (tag: string): 'blue' | 'red' | 'yellow' | 'green' | 'purple' | 'orange' => {
    const hash = tag.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
    return tagColors[hash % tagColors.length]
  }

  const toggleTagFilter = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    )
  }

  const addMyTodo = () => {
    const trimmedValue = inputValue.trim()
    if (!trimmedValue) {
      return
    }
    const newTodo: TodoItemProps = {
      description: trimmedValue,
      check: false,
      color: 'white',
      tags: [],
      id: uuidv4(),
      listId: id,
    }
    dispatch(addNewTodo(newTodo))
    setInputValue('')
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && inputValue.trim()) {
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
    let filteredTasks = listTasks

    // Фильтр по тегам
    if (selectedTags.length > 0) {
      filteredTasks = filteredTasks.filter((task) => {
        if (!task.tags || task.tags.length === 0) return false
        return selectedTags.some((selectedTag) => task.tags?.includes(selectedTag))
      })
    }

    // Фильтр по статусу
    switch (sortType) {
      case 0:
        setSortState(filteredTasks)
        break
      case 1:
        setSortState(filteredTasks.filter((t) => !t.check))
        break
      case 2:
        setSortState(filteredTasks.filter((t) => t.check))
        break
      default:
        setSortState(filteredTasks)
    }
  }, [listTasks, sortType, selectedTags])

  return (
    <div className={className} ref={setNodeRef}>
      <Card className={cn(styles.card, { [styles.dragOver]: isOver })}>
        <Editor
          oldValue={title}
          changeValue={changeListTitle}
          className={styles.editor}
        >
          <h2 className={styles.title}>{title}</h2>
        </Editor>
        <div className={styles.infoPanel}>
          <Sort sort={sortType} setSort={changeSort} />
          <span>
            {sortState.length}{' '}
            {declinWord(sortState.length, ['задачи', 'задача', 'задач'])}
          </span>
        </div>
        {availableTags.length > 0 && (
          <div className={styles.tagsFilter}>
            <span className={styles.tagsFilterLabel}>Фильтр по тегам:</span>
            <div className={styles.tagsFilterList}>
              {availableTags.map((tag) => (
                <Tag
                  key={tag}
                  color={getTagColor(tag)}
                  className={
                    selectedTags.includes(tag) ? styles.tagSelected : ''
                  }
                  onClick={() => toggleTagFilter(tag)}
                >
                  {tag}
                </Tag>
              ))}
              {selectedTags.length > 0 && (
                <button
                  type="button"
                  className={styles.clearFilterButton}
                  onClick={() => setSelectedTags([])}
                >
                  Сбросить
                </button>
              )}
            </div>
          </div>
        )}
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
            <span className={styles.empty}>Список пуст...</span>
          )}
        </ul>
      </Card>

      <Button
        className={styles.deleteButton}
        appearence="delete"
        onClick={() => {
          if (window.confirm('Вы уверены, что хотите удалить этот список?')) {
            dispatch(deleteList(id))
          }
        }}
      >
        Удалить список
      </Button>
    </div>
  )
}
