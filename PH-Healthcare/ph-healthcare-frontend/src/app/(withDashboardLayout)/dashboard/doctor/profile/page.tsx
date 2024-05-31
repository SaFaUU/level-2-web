"use client";
import {
  useGetMYProfileQuery,
  useUpdateMYProfileMutation,
} from "@/redux/api/myProfile";
import { dateFormatter } from "@/utils/dateFormatter";
import {
  Box,
  Button,
  Container,
  Stack,
  Typography,
  styled,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import Image from "next/image";
import React from "react";
import DoctorInformation from "./components/DoctorInformation";
import AutoFileUploader from "@/components/Forms/AutoFileUploader";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ProfileUpdateModal from "./components/ProfileUpdateModal";
import EditIcon from "@mui/icons-material/Edit";

const Profile = () => {
  const { data, isLoading } = useGetMYProfileQuery({});
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);

  const [updateMYProfile, { isLoading: updating }] =
    useUpdateMYProfileMutation();

  const fileupUploadHandler = (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("data", JSON.stringify({}));

    updateMYProfile(formData);
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <ProfileUpdateModal
        open={isModalOpen}
        setOpen={setIsModalOpen}
        id={data?.id}
      />
      <Container>
        <Grid container spacing={4}>
          <Grid xs={12} md={4}>
            <Box
              sx={{
                height: 300,
                width: "100%",
                overflow: "hidden",
                borderRadius: 2,
              }}
            >
              <Image
                height={300}
                width={300}
                src={data?.profilePhoto}
                alt="User Photo"
              />
            </Box>
            {updating ? (
              <div>Uploading...</div>
            ) : (
              <AutoFileUploader
                name="file"
                label="Upload YOur Profile Photo"
                icon={<CloudUploadIcon />}
                onFileUpload={fileupUploadHandler}
                variant="text"
              />
            )}
            <Button
              fullWidth
              endIcon={<EditIcon />}
              onClick={() => setIsModalOpen(true)}
            >
              Edit Profile
            </Button>
          </Grid>
          <Grid xs={12} md={8}>
            <DoctorInformation data={data} />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Profile;
