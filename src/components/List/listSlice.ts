import { v4 as uuidv4 } from 'uuid'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { WritableDraft } from '@reduxjs/toolkit/node_modules/immer/dist/internal'
import { ListProps } from './List.props'

import { initialState as todos, todoSlice } from '../TodoItem/todoSlice'
import { RootState } from '../../store'
import { getLocalStorageState } from '../../helpers/localStorageState'

export interface ListState {
  lists: ListProps[]
}

const initialState: ListState = getLocalStorageState().list

export const listSlice = createSlice({
  name: 'List',
  initialState,
  reducers: {
    addNewList: (state, action: PayloadAction<ListProps>) => {
      state.lists?.push(action.payload as WritableDraft<ListProps>)
    },
    deleteList: (state, action: PayloadAction<string>) => {
      state?.lists.splice(
        state.lists.findIndex((t) => t.id === action.payload),
        1
      )
    },
    changeTitle: (state, action: PayloadAction<ListProps>) => {
      state.lists = state.lists.map((l) => {
        if (l.id === action.payload.id) {
          l.title = action.payload.title
        }
        return l
      })
    },
  },
})

export const { addNewList, deleteList, changeTitle } = listSlice.actions
export const selectList = (state: RootState) => state.list.lists

export default listSlice.reducer
