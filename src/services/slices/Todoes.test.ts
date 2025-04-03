import { expect, test, describe} from '@jest/globals';
import {
  addTask,
  completeTask,
  setFilter,
  clearCompleated,
  selectFiltered,
  selectLeft,
} from "./Todoes";
import { store } from "../store";
import { TodoesSlice } from './Todoes';

const reducer = TodoesSlice.reducer

const mockTasks = [
  { id: "1", title: "Task 1", completed: false },
  { id: "2", title: "Task 2", completed: true },
  { id: "3", title: "Task 3", completed: false },
];

const completedTasks = [{ id: "2", title: "Task 2", completed: true }];

const activeTasks = [
  { id: "1", title: "Task 1", completed: false },
  { id: "3", title: "Task 3", completed: false },
];

describe("TodoesSlice", () => {
    describe("reducers", () => {
        test("addTask", () => {
            const state = reducer(undefined, addTask("Task 4"));
            expect(state.list).toEqual([...mockTasks, { id: "4", title: "Task 4", completed: false }]);
        })
    })
  })