import { TodoState } from '../components/TodoItem/todoSlice'
import { ListState } from '../components/List/listSlice'

export interface RootState {
  todo: TodoState
  list: ListState
}
