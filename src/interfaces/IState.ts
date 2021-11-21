import { TodoState } from '../components/TodoItem/todoSlice'
import { ListState } from '../components/List/listSlice'

export interface IState {
  todo: TodoState
  list: ListState
}
