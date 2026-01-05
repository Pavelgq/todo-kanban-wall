import React, { FC } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'

import { Button, List } from '../components'
import { addNewList, selectList } from '../components/List/listSlice'
import { moveTodoToList } from '../components/TodoItem/todoSlice'

import styles from './App.module.css'

export const App: FC = () => {
  const state = useSelector(selectList)
  const dispatch = useDispatch()

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  )

  const handleClick = () => {
    const newList = {
      title: 'Новый лист',
      id: uuidv4(),
    }
    dispatch(addNewList(newList))
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (!over) return

    const todoId = active.id as string
    const targetListId = over.id as string

    if (targetListId && targetListId.startsWith('list-')) {
      const actualListId = targetListId.replace('list-', '')
      dispatch(moveTodoToList({ id: todoId, listId: actualListId }))
    }
  }

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <div className={styles.container}>
        {state &&
          state.map((l) => {
            return (
              <List
                key={l.id}
                title={l.title}
                id={l.id}
                className={styles.list}
              />
            )
          })}
        <div className={styles.wrapper}>
          <Button
            appearence="primary"
            className={styles.addButton}
            onClick={handleClick}
          >
            Добавить список
          </Button>
        </div>
      </div>
    </DndContext>
  )
}
