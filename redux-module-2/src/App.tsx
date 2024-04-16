import { useState } from "react";
import {
  decrement,
  increment,
  incrementByValue,
} from "./redux/features/counterSlice";
import { useAppDispatch, useAppSelector } from "./redux/hook";

function App() {
  const dispatch = useAppDispatch();
  const { count } = useAppSelector((state) => state.counter);

  return (
    <div className="h-screen w-full flex justify-center items-center">
      <div className="flex border border-purple-300 rounded-md p-10 bg-slate-200 gap-3">
        <button
          className="px-3 py-2 rounded-md bg-green-500 text-xl font-semibold text-white"
          onClick={() => dispatch(incrementByValue(5))}
        >
          Increment by 5
        </button>
        <button
          className="px-3 py-2 rounded-md bg-green-500 text-xl font-semibold text-white"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <h1 className="text-3xl mx-10">{count}</h1>
        <button
          className="px-3 py-2 rounded-md bg-green-500 text-xl font-semibold text-white"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
      </div>
    </div>
  );
}

export default App;
