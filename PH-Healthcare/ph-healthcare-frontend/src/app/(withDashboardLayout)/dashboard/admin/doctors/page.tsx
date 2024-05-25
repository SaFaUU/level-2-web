"use client";
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Stack,
  TextField,
} from "@mui/material";
import React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import Image from "next/image";
import DoctorModal from "./components/DoctorModal";
import { useGetAllDoctorsQuery } from "@/redux/api/doctorApi";

const DoctorsPage = () => {
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);

  const { data, isLoading } = useGetAllDoctorsQuery({});

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
          <IconButton aria-label="delete">
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
        <Button onClick={() => setIsModalOpen(true)}>Create Doctor</Button>
        <DoctorModal open={isModalOpen} setOpen={setIsModalOpen} />
        <TextField size="small" placeholder="Search Doctor" />
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

export default DoctorsPage;
