import { useContext, useState } from "react";
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
import ThemeProvider, { ThemeContext } from "./context/ThemeProvider";
import { MenuItem, MenuList } from "./components/Menu";
import Select from "./components/Select";

function App() {
  const [counter, setCounter] = useState(0);

  const { dark, setDark } = useContext(ThemeContext);
  console.log(dark);

  return (
    <>
      {/* <UseStateExample counter={counter} setCounter={setCounter} /> */}
      {/* <UseStateExampleTwo /> */}
      {/* <UseReducerExample /> */}
      {/* <UseReducerForm /> */}
      {/* <UseEffectExample /> */}
      {/* <UseRefExample /> */}
      {/* <UseRefForm /> */}
      {/* <button
        onClick={() => setDark((prev: any) => !prev)}
        className="btn btn-primary"
      >
        Change Theme
      </button> */}
      {/* <MenuList>
        <MenuItem>Menu Item</MenuItem>
      </MenuList> */}

      <Select>
        <Select.SelectionOption value="1">Option 1</Select.SelectionOption>
        <Select.SelectionOption value="2">Option 2</Select.SelectionOption>
        <Select.SelectionOption value="3">Option 3</Select.SelectionOption>
      </Select>
    </>
  );
}

export default App;
