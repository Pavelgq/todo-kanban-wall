import React, { useState, useMemo, useEffect, useCallback } from 'react'
import cn from 'classnames'
import { useDispatch } from 'react-redux'
import { useDraggable } from '@dnd-kit/core'
import { Checkbox } from '../Checkbox/Checkbox'
import { DeleteButton } from '../DeleteButton/DeleteButton'
import { Editor } from '../Editor/Editor'
import { Tag } from '../Tag/Tag'
import {
  deleteTodo,
  checkTodo,
  editTodoDescription,
  updateTodoTags,
} from './todoSlice'
import styles from './TodoItem.module.css'
import { TodoItemProps } from './TodoItem.props'

const tagColors: Array<
  'blue' | 'red' | 'yellow' | 'green' | 'purple' | 'orange'
> = ['blue', 'red', 'yellow', 'green', 'purple', 'orange']

const parseTagsFromText = (text: string): string[] => {
  const tagRegex = /#(\w+)/g
  const matches = text.match(tagRegex)
  if (!matches) return []
  return Array.from(new Set(matches.map((tag) => tag.substring(1))))
}

const removeTagsFromText = (text: string): string => {
  return text.replace(/#\w+/g, '').trim()
}

export const TodoItem = ({
  description,
  tags = [],
  color,
  check,
  id,
  listId,
}: TodoItemProps): JSX.Element => {
  const dispatch = useDispatch()
  const [isEditingTags, setIsEditingTags] = useState(false)
  const [newTagValue, setNewTagValue] = useState('')

  useEffect(() => {
    if (tags.includes('first')) {
      const updatedTags = tags.filter((tag) => tag !== 'first')
      dispatch(updateTodoTags({ id, tags: updatedTags }))
    }
  }, [tags, id, dispatch])

  const allTags = useMemo(() => {
    const parsedTags = parseTagsFromText(description)
    const filteredTags = tags.filter((t) => t !== 'first')
    return Array.from(new Set([...filteredTags, ...parsedTags]))
  }, [description, tags])

  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id,
    })

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined

  const deleteTodoItem = useCallback(() => {
    dispatch(deleteTodo(id))
  }, [dispatch, id])

  const checkTodoItem = useCallback(() => {
    dispatch(checkTodo(id))
  }, [dispatch, id])

  const editTodo = useCallback(
    (newText: string) => {
      const parsedTags = parseTagsFromText(newText)
      const cleanText = removeTagsFromText(newText)

      const editedTask: TodoItemProps = {
        id,
        check,
        color,
        tags: parsedTags,
        listId,
        description: cleanText,
      }
      dispatch(editTodoDescription(editedTask))
      dispatch(updateTodoTags({ id, tags: parsedTags }))
    },
    [dispatch, id, check, color, listId]
  )

  const handleAddTag = useCallback(() => {
    const trimmedTag = newTagValue.trim()
    if (!trimmedTag) {
      setNewTagValue('')
      setIsEditingTags(false)
      return
    }

    if (allTags.includes(trimmedTag)) {
      setNewTagValue('')
      setIsEditingTags(false)
      return
    }

    const updatedTags = [...allTags, trimmedTag]
    dispatch(updateTodoTags({ id, tags: updatedTags }))
    setNewTagValue('')
    setIsEditingTags(false)
  }, [allTags, dispatch, id, newTagValue])

  const handleRemoveTag = useCallback(
    (tagToRemove: string) => {
      const updatedTags = allTags.filter((tag) => tag !== tagToRemove)
      dispatch(updateTodoTags({ id, tags: updatedTags }))
    },
    [allTags, dispatch, id]
  )

  const createRemoveTagHandler = useCallback(
    (tag: string) => () => {
      handleRemoveTag(tag)
    },
    [handleRemoveTag]
  )

  const handleTagKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        e.preventDefault()
        handleAddTag()
      } else if (e.key === 'Escape') {
        e.preventDefault()
        setIsEditingTags(false)
        setNewTagValue('')
      }
    },
    [handleAddTag]
  )

  const handleTagInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setNewTagValue(e.target.value)
    },
    []
  )

  const handleTagInputBlur = useCallback(() => {
    setTimeout(() => {
      if (newTagValue.trim()) {
        handleAddTag()
      } else {
        setIsEditingTags(false)
        setNewTagValue('')
      }
    }, 150)
  }, [newTagValue, handleAddTag])

  const handleAddTagButtonMouseDown = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()
      e.stopPropagation()
    },
    []
  )

  const handleAddTagButtonClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()
      e.stopPropagation()
      setIsEditingTags(true)
    },
    []
  )

  const getTagColor = (
    tag: string
  ): 'blue' | 'red' | 'yellow' | 'green' | 'purple' | 'orange' => {
    const hash = tag
      .split('')
      .reduce((acc, char) => acc + char.charCodeAt(0), 0)
    return tagColors[hash % tagColors.length]
  }

  return (
    <>
      <li
        ref={setNodeRef}
        style={style}
        className={cn(styles.item, {
          [styles.complite]: check,
          [styles.dragging]: isDragging,
        })}
      >
        <div className={styles.wrapper}>
          <div
            className={styles.dragHandle}
            {...listeners}
            {...attributes}
            title="Перетащить задачу"
          >
            ⋮⋮
          </div>
          <Checkbox id={id} check={check} handleClick={checkTodoItem} />
          <div className={styles.content}>
            <Editor
              oldValue={description}
              changeValue={editTodo}
              className={styles.editor}
            >
              <span className={styles.todoDesctiption}>{description}</span>
            </Editor>
            <div className={styles.tagsContainer}>
              {allTags.map((tag) => (
                <Tag
                  key={tag}
                  color={getTagColor(tag)}
                  onRemove={createRemoveTagHandler(tag)}
                >
                  {tag}
                </Tag>
              ))}
              {isEditingTags ? (
                <input
                  type="text"
                  className={styles.tagInput}
                  value={newTagValue}
                  onChange={handleTagInputChange}
                  onKeyDown={handleTagKeyDown}
                  onBlur={handleTagInputBlur}
                  placeholder="Новый тег..."
                  autoFocus
                />
              ) : (
                <button
                  type="button"
                  className={styles.addTagButton}
                  onMouseDown={handleAddTagButtonMouseDown}
                  onClick={handleAddTagButtonClick}
                  title="Добавить тег"
                >
                  + Тег
                </button>
              )}
            </div>
          </div>

          <DeleteButton
            className={styles.delButton}
            handleClick={deleteTodoItem}
          />
        </div>
      </li>
    </>
  )
}
