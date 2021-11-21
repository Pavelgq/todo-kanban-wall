import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../store'
import { TodoItemProps } from './TodoItem.props'
import { getLocalStorageState } from '../../helpers/localStorageState'

export interface TodoState {
  tasks: TodoItemProps[]
}

export const initialState: TodoState = getLocalStorageState().todo

export const todoSlice = createSlice({
  name: 'Todo',
  initialState,
  reducers: {
    addNewTodo: (state, action: PayloadAction<TodoItemProps>) => {
      state.tasks.unshift(action.payload)
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      state?.tasks.splice(
        state.tasks.findIndex((t) => t.id === action.payload),
        1
      )
    },
    checkTodo: (state, action: PayloadAction<string>) => {
      const taskIndex = state.tasks.findIndex((t) => t.id === action.payload)
      state.tasks[taskIndex].check = !state.tasks[taskIndex].check
    },
    deleteList: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((t) => t.listId !== action.payload)
    },
    editTodoDescription: (state, action: PayloadAction<TodoItemProps>) => {
      const taskIndex = state.tasks.findIndex((t) => t.id === action.payload.id)
      state.tasks[taskIndex].description = action.payload.description
    },
  },
})
export const {
  addNewTodo,
  deleteTodo,
  checkTodo,
  editTodoDescription,
} = todoSlice.actions
export const selectTodo = (state: RootState) => state.todo.tasks

export default todoSlice.reducer
