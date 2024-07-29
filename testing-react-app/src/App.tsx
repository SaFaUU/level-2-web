import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import PrimaryButton from "./components/PrimaryButton";
import Users from "./components/Users/Users";
import FruitList from "./components/FruitList/FruitList";

function App() {
  const [count, setCount] = useState(0);

  const fruits = ["apple", "banana", "orange", "mango", "pineapple"];

  return (
    <>
      <div>
        <h1>Hello World</h1>
        <PrimaryButton />
        <PrimaryButton actionType="Delete" />
        <Users />
        <FruitList fruits={fruits} />
      </div>
    </>
  );
}

export default App;
