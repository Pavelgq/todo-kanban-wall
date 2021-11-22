import { useSelector, useDispatch } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'

import { Button, List } from '../components'
import { addNewList, selectList } from '../components/List/listSlice'

import styles from './App.module.css'

export const App = (): JSX.Element => {
  const state = useSelector(selectList)
  const dispatch = useDispatch()

  const handleClick = () => {
    const newList = {
      title: 'Новый лист',
      id: uuidv4(),
    }
    dispatch(addNewList(newList))
  }

  return (
    <div className={styles.container}>
      {state &&
        state.map((l) => {
          return (
            <List
              key={l.id}
              title={l.title}
              id={l.id}
              className={styles.list}
            />
          )
        })}
      <div className={styles.wrapper}>
        <Button
          appearence="primary"
          className={styles.addButton}
          onClick={handleClick}
        >
          Добавить лист
        </Button>
      </div>
    </div>
  )
}
