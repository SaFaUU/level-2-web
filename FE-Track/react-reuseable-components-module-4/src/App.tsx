import { useState } from "react";
import MainLayout from "./components/layout/MainLayout";
import Container from "./components/ui/Container";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Container>
      <MainLayout />
    </Container>
  );
}

export default App;
