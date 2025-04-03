import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuid } from 'uuid';
type TTask = {
    id: string,
    title: string,
    completed: boolean
}

type TTodoesList = {
    list: TTask[],
    filter: boolean | null
}

const initialState: TTodoesList = {
    list: [    {
        id: "1",
        title: "Закончить проект",
        completed: false
    },
    {
        id: "2",
        title: "Купить продукты",
        completed: true
    },
    {
        id: "3",
        title: "Позвонить другу",
        completed: false
    },
    {
        id: "4",
        title: "Прочитать книгу",
        completed: false
    },
    {
        id: "5",
        title: "Сходить в спортзал",
        completed: true
    },
    {
        id: "6",
        title: "Написать отчет",
        completed: false
    },
    {
        id: "7",
        title: "Обновить резюме",
        completed: true
    },
    {
        id: "8",
        title: "Запланировать отпуск",
        completed: false
    }],
    filter: null
}

export const TodoesSlice = createSlice({
    name: 'todoes',
    initialState,
    selectors: {
        selectFiltered: (state) => {
            if (state.filter === null) return state.list;
            return state.list.filter(task => task.completed === state.filter);
          },
        selectLeft: (state) => state.list.filter(task => !task.completed).length
    },
    reducers: {
        addTask: {
            reducer: (state, action: PayloadAction<TTask>) => {
              state.list.push(action.payload);
            },
            prepare: (title: string) => {
             return {payload: {
                id: uuid(),
                title,
                completed: false
              }
            }
            }
          },
        completeTask: (state, action: PayloadAction<string>) => {
            state.list = state.list.map(task => task.id === action.payload ? { ...task, completed: !task.completed } : task)
        },
        setFilter: (state, action: PayloadAction<boolean | null>) => {
            state.filter = action.payload
        },
        clearCompleated: (state) => {
            state.list = state.list.filter(task => !task.completed)
        }
    }
})

export const { addTask, completeTask, setFilter, clearCompleated } = TodoesSlice.actions
export const { selectFiltered, selectLeft } = TodoesSlice.selectors
export default TodoesSlice.reducer