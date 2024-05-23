import PHFileUploader from "@/components/Forms/PHFileUploader";
import PHForm from "@/components/Forms/PHForm";
import PHInput from "@/components/Forms/PHInput";
import PHModal from "@/components/Shared/PHModal/PHModal";
import { Button, Grid, TextField } from "@mui/material";
import React from "react";
import { FieldValues } from "react-hook-form";

type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const SpecialistModal = ({ open, setOpen }: TProps) => {
  const handleFormSubmit = (values: FieldValues) => {
    setOpen(false);
  };
  return (
    <PHModal open={open} setOpen={setOpen} title="Create a new Specialty">
      <PHForm onSubmit={handleFormSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <PHInput name="title" label="Title" />
          </Grid>
          <Grid item xs={6}>
            <PHFileUploader />
          </Grid>
        </Grid>
        <Button type="submit" sx={{ mt: 2 }}>
          Create
        </Button>
      </PHForm>
    </PHModal>
  );
};

export default SpecialistModal;
