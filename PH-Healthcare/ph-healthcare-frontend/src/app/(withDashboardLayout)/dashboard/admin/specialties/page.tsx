"use client";
import { Box, Stack, Button, TextField, IconButton } from "@mui/material";
import React from "react";
import SpecialtyModal from "./components/SpecialtyModal";
import {
  useDeleteSpecialtyMutation,
  useGetAllSpecialtysQuery,
} from "@/redux/api/specialtiesApi";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import CircularProgress from "@mui/material/CircularProgress";
import Image from "next/image";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "sonner";

const SpecialistPage = () => {
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
  const { data, isLoading } = useGetAllSpecialtysQuery({});
  const [deleteSpecialty] = useDeleteSpecialtyMutation();

  console.log(data);

  const handleDelete = async (id: string) => {
    try {
      const res = await deleteSpecialty(id).unwrap();
      console.log(res);
      if (res.id) {
        toast.success("Specialty deleted successfully");
      }
    } catch (err: any) {
      console.error(err.message);
      toast.error(err.message);
    }
  };

  const columns: GridColDef[] = [
    { field: "title", headerName: "Title", width: 300 },
    {
      field: "icon",
      headerName: "Icon",
      flex: 1,
      headerAlign: "center",
      align: "center",

      renderCell: ({ row }) => {
        return (
          <Box my={2}>
            <Image src={row.icon} alt={row.title} width={30} height={30} />
          </Box>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: ({ row }) => {
        return (
          <IconButton aria-label="delete" onClick={() => handleDelete(row.id)}>
            <DeleteIcon />
          </IconButton>
        );
      },
    },
  ];

  return (
    <Box>
      <Stack
        direction="row"
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Button onClick={() => setIsModalOpen(true)}>Create Specialty</Button>
        <SpecialtyModal open={isModalOpen} setOpen={setIsModalOpen} />
        <TextField size="small" placeholder="Search Specialist" />
      </Stack>
      {!isLoading ? (
        <Box>
          <DataGrid rows={data} columns={columns} />
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: 5,
            mb: 5,
            width: "100%",
            height: "100%",
          }}
        >
          <CircularProgress />
        </Box>
      )}
    </Box>
  );
};

export default SpecialistPage;
