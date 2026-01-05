import React, { FC, useEffect, useRef, useState } from 'react'
import cn from 'classnames'
import { EditorProps } from './Editor.props'
import styles from './Editor.module.css'

export const Editor: FC<EditorProps> = ({
  oldValue,
  changeValue,
  children,
  className,
  ...props
}) => {
  const [editValue, setEditValue] = useState<string>(oldValue)
  const [editStatus, setEditStatus] = useState<boolean>(false)

  useEffect(() => {
    setEditValue(oldValue)
  }, [oldValue])

  const editTitle = () => {
    const trimmedValue = editValue.trim()
    if (!trimmedValue) {
      // Если значение пустое, оставляем старое
      setEditValue(oldValue)
      setEditStatus(false)
      return
    }
    // Сохраняем новое значение, даже если оно отличается только пробелами
    changeValue(trimmedValue)
    setEditStatus(false)
  }

  const handleChange = ({
    currentTarget,
  }: React.FormEvent<HTMLInputElement>) => {
    setEditValue(currentTarget.value)
  }
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === 'Tab') {
      e.preventDefault()
      editTitle()
    } else if (e.key === 'Escape') {
      setEditValue(oldValue)
      setEditStatus(false)
    }
  }
  const handleChangeStatus = () => {
    setEditStatus(!editStatus)
  }

  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!editStatus) return

    const onClick = (event: MouseEvent) => {
      const target = event.target as Node
      if (inputRef.current && !inputRef.current.contains(target)) {
        const trimmedValue = editValue.trim()
        if (!trimmedValue) {
          setEditValue(oldValue)
          setEditStatus(false)
          return
        }
        changeValue(trimmedValue)
        setEditStatus(false)
      }
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [editStatus, editValue, oldValue, changeValue])

  return (
    <>
      {!editStatus && (
        <button
          type="button"
          className={styles.button}
          onClick={handleChangeStatus}
        >
          {children}
        </button>
      )}
      {editStatus && (
        <input
          value={editValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          ref={inputRef}
          autoFocus
          className={cn(styles.input, className)}
          {...props}
        />
      )}
    </>
  )
}
