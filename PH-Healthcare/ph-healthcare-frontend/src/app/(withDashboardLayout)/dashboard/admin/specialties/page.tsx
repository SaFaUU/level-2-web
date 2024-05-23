"use client";
import { Box, Stack, Button, TextField } from "@mui/material";
import React from "react";
import SpecialistModal from "./components/SpecialistModal";

const SpecialistPage = () => {
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);

  return (
    <Box>
      <Stack
        direction="row"
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Button onClick={() => setIsModalOpen(true)}>Create Specialty</Button>
        <SpecialistModal open={isModalOpen} setOpen={setIsModalOpen} />
        <TextField size="small" placeholder="Search Specialist" />
      </Stack>
    </Box>
  );
};

export default SpecialistPage;
