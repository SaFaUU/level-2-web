import { createSlice } from "@reduxjs/toolkit/react";
import type { PayloadAction } from "@reduxjs/toolkit";

type CounterType = {
  count: number;
};

const initialState: CounterType = {
  count: 0,
};

const counterSlice = createSlice({
  name: "counter",
  initialState: initialState,
  reducers: {
    increment: (state) => {
      state.count += 1;
    },
    decrement: (state) => {
      state.count -= 1;
    },
    incrementByValue: (state, action: PayloadAction<number>) => {
      state.count += action.payload;
    },
  },
});

export const { increment, decrement, incrementByValue } = counterSlice.actions;
export default counterSlice.reducer;
