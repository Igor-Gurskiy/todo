import { useState } from 'react'
import './Form.scss'
import { useDispatch } from 'react-redux'
import { addTask } from '../../services/slices/Todoes'
import { SyntheticEvent, FC } from 'react'

export const Form: FC = () => {
    const dispatch = useDispatch()
  const [todo, setTodo] = useState('')

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault()
    dispatch(addTask(todo))
    setTodo('')
  }
  return (

        <form onSubmit={handleSubmit}>
      <input className='input' type="text" value={todo} placeholder="add todo" onChange={(e) => setTodo(e.target.value)}/>
      <button className='button' type='submit'>Add</button>
      </form>

  )
}
