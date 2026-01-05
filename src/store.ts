import { configureStore, Middleware } from '@reduxjs/toolkit'

import todoReducer from './components/TodoItem/todoSlice'
import listReducer from './components/List/listSlice'

const localStorageMiddleware: Middleware = (store) => (next) => (action) => {
  const result = next(action)
  try {
    const state = store.getState()
    localStorage.setItem('store', JSON.stringify(state))
  } catch (error) {
    console.error('Ошибка при сохранении состояния в localStorage:', error)
  }
  return result
}

export const store = configureStore({
  reducer: {
    todo: todoReducer,
    list: listReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware),
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
