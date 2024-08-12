import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import UseStateExample from "./pages/UseStateExample";
import UseStateExampleTwo from "./pages/UseStateExampleTwo";

function App() {
  const [counter, setCounter] = useState(0);

  return (
    <>
      {/* <UseStateExample counter={counter} setCounter={setCounter} /> */}
      <UseStateExampleTwo />
    </>
  );
}

export default App;
