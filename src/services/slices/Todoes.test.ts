import { expect, test, describe, vi } from "vitest";
import {
  addTask,
  completeTask,
  setFilter,
  clearCompleated,
  selectFiltered,
  selectLeft,
  initialState,
} from "./Todoes";
import { TodoesSlice } from "./Todoes";

const reducer = TodoesSlice.reducer;

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
    test("addTask - should add new task with generated id", () => {
      vi.mock("uuid", () => ({
        v4: () => "4",
      }));
      const state = { ...initialState, list: mockTasks };
      const newState = reducer(state, addTask("Task 4"));
      expect(newState.list).toEqual([
        ...mockTasks,
        { id: "4", title: "Task 4", completed: false },
      ]);
    });

    test("completeTask - should toggle completed status", () => {
      const state = { ...initialState, list: mockTasks };
      const stateReady = reducer(state, completeTask("1"));
      expect(stateReady.list.find((task) => task.id === "1")?.completed).toBe(
        true
      );

      const stateNotReady = reducer(stateReady, completeTask("1"));
      expect(
        stateNotReady.list.find((task) => task.id === "1")?.completed
      ).toBe(false);
    });

    test("setFilter - should update filter value", () => {
      const state = { ...initialState, list: mockTasks };
      const stateReady = reducer(state, setFilter(true));
      expect(stateReady.filter).toBe(true);

      const stateNotReady = reducer(state, setFilter(false));
      expect(stateNotReady.filter).toBe(false);

      const stateAll = reducer(state, setFilter(null));
      expect(stateAll.filter).toBe(null);
    });

    test("clearCompleated - should remove completed tasks", () => {
      const state = { ...initialState, list: mockTasks };
      const stateReady = reducer(state, clearCompleated());
      expect(stateReady.list).toEqual(activeTasks);
    });
  });

  describe("selectors", () => {
    test("selectFiltered - should return all tasks when filter is null", () => {
      const rootState = {
        todoes: {
          ...initialState,
          list: mockTasks,
          filter: null,
        },
      };
      const result = selectFiltered(rootState);
      expect(result).toEqual(mockTasks);
    });

    test("selectFiltered - should return only completed tasks when filter is true", () => {
      const rootState = {
        todoes: {
          ...initialState,
          list: mockTasks,
          filter: true,
        },
      };
      const result = selectFiltered(rootState);
      expect(result).toEqual(completedTasks);
    });

    test("selectFiltered - should return only active tasks when filter is false", () => {
      const rootState = {
        todoes: {
          ...initialState,
          list: mockTasks,
          filter: false,
        },
      };
      const result = selectFiltered(rootState);
      expect(result).toEqual(activeTasks);
    });

    test("selectLeft - should return count of active tasks", () => {
      const rootState = {
        todoes: {
          ...initialState,
          list: mockTasks,
        },
      };
      const result = selectLeft(rootState);
      expect(result).toBe(2);
    });

    test("selectLeft - should return 0 when all tasks are completed", () => {
      const rootState = {
        todoes: {
          ...initialState,
          list: mockTasks.map((t) => ({ ...t, completed: true })),
        },
      };
      const result = selectLeft(rootState);
      expect(result).toBe(0);
    });
  });
});
