import Container from "../components/ui/Container";

import { useState } from "react";
import Modal from "../components/ui/Modal";
import Button from "../components/ui/Button";

const Home = () => {
  const [modal, setModal] = useState(false);

  const handleModalClose = () => {
    setModal((prev) => !prev);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setModal((prev) => !prev);
  };

  return (
    <Container>
      <Modal isOpen={modal} onClose={handleModalClose}>
        <Modal.Header>
          <h1>This is a Header Title</h1>
          <Modal.CloseButton />
        </Modal.Header>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Enter your name" />
          <button type="submit">Submit</button>
        </form>
      </Modal>
      <Button variant="solid" className="" onClick={handleModalClose}>
        {" "}
        Open Modal
      </Button>
    </Container>
  );
};

export default Home;
