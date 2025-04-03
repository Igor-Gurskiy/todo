import { configureStore, combineSlices } from '@reduxjs/toolkit';
import { TodoesSlice } from './slices/Todoes';
import {
    TypedUseSelectorHook,
    useDispatch as dispatchHook,
    useSelector as selectorHook
  } from 'react-redux';

const rootReducer = combineSlices({
    todoes: TodoesSlice.reducer
})

const store = configureStore({
    reducer: rootReducer
})

export type RootState = ReturnType<typeof rootReducer>

export type AppDispatch = typeof store.dispatch

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store