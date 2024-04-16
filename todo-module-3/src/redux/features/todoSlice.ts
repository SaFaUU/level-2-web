import { createSlice } from "@reduxjs/toolkit/react";
import type { PayloadAction } from "@reduxjs/toolkit";

type TInitialState = {
  todos: TTodo[];
};
type TTodo = {
  id: string;
  title: string;
  description: string;
  isCompleted?: boolean;
};

const initialState: TInitialState = {
  todos: [],
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<TTodo>) => {
      state.todos.push({ ...action.payload, isCompleted: false });
    },
    removeTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter((item) => item.id != action.payload);
    },
    toggleComplete: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.map((todo) => {
        if (todo.id === action.payload) {
          return { ...todo, isCompleted: !todo.isCompleted };
        }
        return todo;
      });
    },
  },
});

export const { addTodo, removeTodo, toggleComplete } = todoSlice.actions;

export default todoSlice.reducer;
