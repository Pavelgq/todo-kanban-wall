import { IState } from '../interfaces/IState'

const defaultState: IState = {
  todo: { tasks: [] },
  list: { lists: [] },
}

export const getLocalStorageState = (): IState => {
  try {
    const state = localStorage.getItem('store')
    if (state === null) {
      return defaultState
    }
    const parsedState = JSON.parse(state) as IState
    // Валидация структуры состояния
    if (!parsedState.todo || !parsedState.list) {
      return defaultState
    }
    return parsedState
  } catch (error) {
    console.error('Ошибка при загрузке состояния из localStorage:', error)
    return defaultState
  }
}
