import { useState, Dispatch, SetStateAction } from "react";

type TCounter = {
  counter: number;
  setCounter: Dispatch<SetStateAction<number>>;
};

const UseStateExample = ({ counter, setCounter }: TCounter) => {
  return (
    <div className="flex justify-center items-center align-middle h-svh">
      <div className="gap-4 flex flex-col">
        <h1 className="text-5xl block">{counter}</h1>
        <div className="flex gap-4">
          <button
            onClick={() => setCounter((prev) => prev + 1)}
            className="btn btn-primary"
          >
            Increment
          </button>
          <button
            onClick={() => setCounter((prev) => prev - 1)}
            className="btn btn-secondary"
          >
            Decrement
          </button>
          <button onClick={() => setCounter(0)} className="btn btn-danger">
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default UseStateExample;
