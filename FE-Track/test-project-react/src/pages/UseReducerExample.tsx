import React from "react";

const initialState = { count: 0 };

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    default:
      return initialState;
  }
};

const UseReducerExample = () => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  return (
    <div>
      <h1>{state.count}</h1>
      <button
        onClick={() => dispatch({ type: "increment" })}
        className="btn btn-primary"
      >
        +
      </button>
      <button
        onClick={() => dispatch({ type: "decrement" })}
        className="btn btn-secondary"
      >
        -
      </button>
    </div>
  );
};

export default UseReducerExample;
