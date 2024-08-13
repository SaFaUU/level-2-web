import React from "react";

type TAction = {
  type: string;
  payload: string;
};

const initialState = { name: "", email: "" };

const reducer = (state: typeof initialState, action: TAction) => {
  switch (action.type) {
    case "addName":
      return { ...state, name: action.payload };
    case "addEmail":
      return { ...state, email: action.payload };
    default:
      return initialState;
  }
};

const UseReducerForm = () => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(state);
  };

  return (
    <div className="flex flex-col justify-center items-center align-middle h-svh gap-6">
      <form
        className="flex gap-4 flex-col align-middle justify-center w-full h-screen items-center"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          name="name"
          id="name"
          className="input input-bordered input-primary w-full max-w-xs"
          onChange={(e) =>
            dispatch({ type: "addName", payload: e.target.value })
          }
        ></input>
        <input
          type="text"
          name="email"
          id="email"
          className="input input-bordered input-primary w-full max-w-xs"
          onChange={(e) =>
            dispatch({ type: "addEmail", payload: e.target.value })
          }
        ></input>
        <button className="btn btn-primary max-w-xl" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default UseReducerForm;
