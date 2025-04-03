import { useSelector } from 'react-redux'
import { selectFiltered } from '../../services/slices/Todoes'
import { FC } from 'react'
import { Item } from '../item/Item'
import './List.scss'
export const List: FC = () => {

    const todoes = useSelector(selectFiltered)

    return (
        <ul className="list">
        {todoes && todoes.map((task) => (
          <Item key={task.id} {...task} />
        ))}
      </ul>
    )
}