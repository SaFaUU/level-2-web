import { useEffect, useState } from "react";

const UseEffectExample = () => {
  const [hidden, setHidden] = useState(false);

  return (
    <div className="flex flex-col justify-center items-center align-middle h-svh gap-6">
      {/* <button onClick={() => setHidden((prev) => !prev)}>Click</button> */}
      <button
        onClick={() => setHidden((prev) => !prev)}
        className="btn btn-primary"
      >
        {hidden ? "Show" : "Hide"}
      </button>
      {/* {!hidden && <Counter />} */}
      {!hidden && <Todo />}
    </div>
  );
};

const Counter = () => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const intervalId = setInterval(() => {
      console.log("Render");
      setCount((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);
  return <h1>{count}</h1>;
};

const Todo = () => {
  const controller = new AbortController();
  const signal = controller.signal;

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos/1", { signal })
      .then((response) => response.json())
      .then((json) => console.log(json));

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <div className="border p-4 rounded">
      <h1>Todo</h1>
    </div>
  );
};

export default UseEffectExample;
