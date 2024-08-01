import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import PrimaryButton from "./components/PrimaryButton";
import Users from "./components/Users/Users";
import FruitList from "./components/FruitList/FruitList";
import UserTable from "./components/UsersTable/UsersTable";
import FormComponent from "./components/Form/Form";
import Counter from "./components/Counter/Counter";

export const users = [
  { id: 1, name: "John", age: 32 },
  {
    id: 2,
    name: "Jane",
    age: 25,
  },
  {
    id: 3,
    name: "Bob",
    age: 43,
  },
];

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
        {/* <FruitList fruits={fruits} /> */}
        <UserTable users={users} />
        <FormComponent
          onSubmit={(data) => {
            console.log(data);
          }}
        />
        <Counter />
      </div>
    </>
  );
}

export default App;
