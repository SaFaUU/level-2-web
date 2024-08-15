import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import UseStateExample from "./pages/UseStateExample";
import UseStateExampleTwo from "./pages/UseStateExampleTwo";
import UseReducerExample from "./pages/UseReducerExample";
import UseReducerForm from "./pages/UseReducerForm";
import UseEffectExample from "./pages/UseEffectExample";
import UseRefExample from "./pages/UseRefExample";
import UseRefForm from "./pages/UseRefForm";

function App() {
  const [counter, setCounter] = useState(0);

  return (
    <>
      {/* <UseStateExample counter={counter} setCounter={setCounter} /> */}
      {/* <UseStateExampleTwo /> */}
      {/* <UseReducerExample /> */}
      {/* <UseReducerForm /> */}
      {/* <UseEffectExample /> */}
      {/* <UseRefExample /> */}
      <UseRefForm />
    </>
  );
}

export default App;
