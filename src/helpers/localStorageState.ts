import { IState } from '../interfaces/IState'

export const getLocalStorageState = (): IState | any => {
  try {
    const state = localStorage.getItem('store')
    if (state === null) {
      return {
        todo: { tasks: [] },
        list: { lists: [] },
      }
    }
    return JSON.parse(state)
  } catch (error) {
    Error('error')
    return undefined
  }
}
