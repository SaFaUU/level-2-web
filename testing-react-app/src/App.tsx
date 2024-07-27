import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import PrimaryButton from "./components/PrimaryButton";
import Users from "./components/Users/Users";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <h1>Hello World</h1>
        <PrimaryButton />
        <PrimaryButton actionType="Delete" />
        <Users />
      </div>
    </>
  );
}

export default App;
