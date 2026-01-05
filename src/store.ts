import { configureStore, Middleware, AnyAction } from '@reduxjs/toolkit'

import todoReducer from './components/TodoItem/todoSlice'
import listReducer from './components/List/listSlice'
import { syncTodoState } from './components/TodoItem/todoSlice'
import { syncListState } from './components/List/listSlice'

const localStorageMiddleware: Middleware = (store) => (next) => (
  action: unknown
) => {
  const result = next(action)

  const actionTyped = action as AnyAction
  if (
    actionTyped.type === 'Todo/syncState' ||
    actionTyped.type === 'List/syncState'
  ) {
    return result
  }

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

if (typeof window !== 'undefined') {
  window.addEventListener('storage', (e) => {
    if (e.key === 'store' && e.newValue) {
      try {
        const newState = JSON.parse(e.newValue)

        if (newState.todo && newState.list) {
          store.dispatch(syncTodoState(newState.todo))
          store.dispatch(syncListState(newState.list))
        }
      } catch (error) {
        console.error(
          'Ошибка при синхронизации состояния из localStorage:',
          error
        )
      }
    }
  })
}
export type AppDispatch = typeof store.dispatch
export type { RootState } from './types/store'
