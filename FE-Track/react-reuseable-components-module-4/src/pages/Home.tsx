import Container from "../components/ui/Container";

import { useState } from "react";
import Modal from "../components/ui/Modal";
import Button from "../components/ui/Button";

const Home = () => {
  const [modal, setModal] = useState(false);

  const handleModalClose = () => {
    setModal((prev) => !prev);
  };

  return (
    <Container>
      <Modal isOpen={modal} onClose={handleModalClose}>
        <div className="w-full max-w-2xl mx-auto bg-white">
          <h1>This is a modal</h1>
        </div>
      </Modal>
      <Button variant="solid" className="" onClick={handleModalClose}>
        {" "}
        Open Modal
      </Button>
    </Container>
  );
};

export default Home;
