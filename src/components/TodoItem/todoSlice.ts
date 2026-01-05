import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../store'
import { TodoItemProps } from './TodoItem.props'
import { getLocalStorageState } from '../../helpers/localStorageState'

export interface TodoState {
  tasks: TodoItemProps[]
}

const defaultTodoState: TodoState = {
  tasks: [],
}

export const initialState: TodoState =
  getLocalStorageState().todo || defaultTodoState

export const todoSlice = createSlice({
  name: 'Todo',
  initialState,
  reducers: {
    addNewTodo: (state, action: PayloadAction<TodoItemProps>) => {
      state.tasks.unshift(action.payload)
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      const taskIndex = state.tasks.findIndex((t) => t.id === action.payload)
      if (taskIndex !== -1) {
        state.tasks.splice(taskIndex, 1)
      }
    },
    checkTodo: (state, action: PayloadAction<string>) => {
      const taskIndex = state.tasks.findIndex((t) => t.id === action.payload)
      if (taskIndex !== -1) {
        state.tasks[taskIndex].check = !state.tasks[taskIndex].check
      }
    },
    deleteList: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((t) => t.listId !== action.payload)
    },
    editTodoDescription: (state, action: PayloadAction<TodoItemProps>) => {
      const taskIndex = state.tasks.findIndex((t) => t.id === action.payload.id)
      if (taskIndex !== -1) {
        state.tasks[taskIndex].description = action.payload.description
      }
    },
    updateTodoTags: (
      state,
      action: PayloadAction<{ id: string; tags: string[] }>
    ) => {
      const taskIndex = state.tasks.findIndex((t) => t.id === action.payload.id)
      if (taskIndex !== -1) {
        state.tasks[taskIndex].tags = action.payload.tags
      }
    },
    moveTodoToList: (
      state,
      action: PayloadAction<{ id: string; listId: string }>
    ) => {
      const taskIndex = state.tasks.findIndex((t) => t.id === action.payload.id)
      if (taskIndex !== -1) {
        state.tasks[taskIndex].listId = action.payload.listId
      }
    },
  },
})
export const {
  addNewTodo,
  deleteTodo,
  checkTodo,
  editTodoDescription,
  updateTodoTags,
  moveTodoToList,
} = todoSlice.actions
export const selectTodo = (state: RootState): TodoItemProps[] =>
  state.todo.tasks

export default todoSlice.reducer
