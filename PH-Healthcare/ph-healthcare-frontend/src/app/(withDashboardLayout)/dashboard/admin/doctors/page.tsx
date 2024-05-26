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
import {
  useDeleteDoctorMutation,
  useGetAllDoctorsQuery,
} from "@/redux/api/doctorApi";
import { useDebounced } from "@/redux/hooks";
import { toast } from "sonner";

const DoctorsPage = () => {
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
  const query: Record<string, any> = {};
  const [searchTerm, setSearchTerm] = React.useState<string>("");

  const debouncedTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 500,
  });

  if (!!debouncedTerm) {
    query["searchTerm"] = searchTerm;
  }

  const { data, isLoading } = useGetAllDoctorsQuery({ ...query });

  const [deleteDoctor] = useDeleteDoctorMutation();

  const doctors = data?.doctors;

  const meta = data?.meta;

  const handleDelete = async (id: string) => {
    try {
      const res = await deleteDoctor(id);
      console.log(res);
      if (res?.data?.id) {
        toast.success("Doctor Deleted Successfully");
      }
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "contactNumber", headerName: "Contact Number", flex: 1 },
    { field: "gender", headerName: "Gender", flex: 1 },
    { field: "appointmentFee", headerName: "appointmentFee", flex: 1 },
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
        <Button onClick={() => setIsModalOpen(true)}>Create Doctor</Button>
        <DoctorModal open={isModalOpen} setOpen={setIsModalOpen} />
        <TextField
          size="small"
          placeholder="Search Doctor"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Stack>
      {!isLoading ? (
        <Box>
          <DataGrid rows={doctors} columns={columns} />
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
