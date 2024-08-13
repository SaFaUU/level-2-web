import React from "react";

const initialState = { count: 0 };

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    case "incrementBySetAmount":
      return { count: state.count + action.payload };
    default:
      return initialState;
  }
};

const UseReducerExample = () => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  return (
    <div className="flex flex-col justify-center items-center align-middle h-svh gap-6">
      <h1>{state.count}</h1>
      <div className="gap-4 flex items-center align-middle justify-center">
        <button
          onClick={() => dispatch({ type: "increment" })}
          className="btn btn-primary"
        >
          +
        </button>
        <button
          onClick={() => dispatch({ type: "incrementBySetAmount", payload: 3 })}
          className="btn btn-danger"
        >
          Increament by 3
        </button>
        <button
          onClick={() => dispatch({ type: "decrement" })}
          className="btn btn-secondary"
        >
          -
        </button>
      </div>
    </div>
  );
};

export default UseReducerExample;
