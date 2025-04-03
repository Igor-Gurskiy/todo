import { FC } from 'react'
import { useDispatch } from '../../services/store'
import { completeTask } from '../../services/slices/Todoes'
import './Item.scss'
type ItemProps = {
    id: string,
    title: string,
    completed: boolean
}
export const Item: FC<ItemProps> = (item) => {
    
    const dispatch = useDispatch()
    const handleComplete = () => {
        dispatch(completeTask(item.id))
    }
    return (
        <li key={item.id} className='item'>
            <input type="checkbox" checked={item.completed} onChange={handleComplete} />
            <span className="checkbox"></span>
            <h3 className="title">{item.title}</h3>
          </li>
    )
}