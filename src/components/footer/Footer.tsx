import './Footer.scss'
import { useDispatch, useSelector } from 'react-redux'

import { setFilter, clearCompleated, selectLeft } from '../../services/slices/Todoes'
import { FC, useEffect } from 'react'

export const Footer: FC = () => {
    const dispatch = useDispatch()
    const taskLeft = useSelector(selectLeft)
    useEffect(() => {
        
    }, [])
    return (
        <div className="footer">
        <span>{taskLeft} tasks left</span>
            <div className='filters'>
                <button onClick={() => dispatch(setFilter(null))}>All</button>
                <button onClick={() => dispatch(setFilter(false))}>Active</button>
                <button onClick={() => dispatch(setFilter(true))}>Completed</button>
            </div>
        <button className='clear-btn'
        onClick={() => dispatch(clearCompleated())}>Clear completed</button>
        </div>
    )
}