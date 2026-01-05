import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ListProps } from './List.props'

import { RootState } from '../../types/store'
import { getLocalStorageState } from '../../helpers/localStorageState'

export interface ListState {
  lists: ListProps[]
}

const defaultListState: ListState = { lists: [] }

export const listSlice = createSlice({
  name: 'List',
  initialState: getLocalStorageState().list || defaultListState,
  reducers: {
    addNewList: (state, action: PayloadAction<ListProps>) => {
      if (!state.lists) {
        state.lists = []
      }
      state.lists.push({
        id: action.payload.id,
        title: action.payload.title,
      })
    },
    deleteList: (state, action: PayloadAction<string>) => {
      if (!state.lists) {
        return
      }
      const listIndex = state.lists.findIndex((t) => t.id === action.payload)
      if (listIndex !== -1) {
        state.lists.splice(listIndex, 1)
      }
    },
    changeTitle: (state, action: PayloadAction<ListProps>) => {
      if (!state.lists) {
        return
      }
      state.lists = state.lists.map((l) => {
        if (l.id === action.payload.id) {
          l.title = action.payload.title
        }
        return l
      })
    },
    syncState: (state, action: PayloadAction<ListState>) => {
      return action.payload
    },
  },
})

export const { addNewList, deleteList, changeTitle, syncState: syncListState } = listSlice.actions
export const selectList = (state: RootState): ListProps[] => state.list.lists

export default listSlice.reducer
