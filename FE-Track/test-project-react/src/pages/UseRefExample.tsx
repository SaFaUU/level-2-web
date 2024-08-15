import React from "react";

const UseRefExample = () => {
  const inputRef = React.useRef(0);
  const [count, setCount] = React.useState(0);

  const increment = () => {
    inputRef.current = inputRef.current + 1;
    setCount(count + 1);
    console.log("count: ", count);
    console.log("ref", inputRef.current);
  };
  return (
    <div>
      <h1>UseRefExample</h1>
      <button onClick={() => increment()} className="btn btn-primary">
        {count}
      </button>
    </div>
  );
};

export default UseRefExample;
