import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Button } from "./components/ui/button";
import MainLayout from "./components/layouts/MainLayout";

function App() {
  const [count, setCount] = useState(0);

  return <MainLayout />;
}

export default App;