"use client";
import { useGetMYProfileQuery } from "@/redux/api/myProfile";
import { Box, Container, Stack, Typography, styled } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import Image from "next/image";
import React from "react";

const StyledInformationBox = styled(Box)(({ theme }) => ({
  backgroundColor: "#f4f7fe",
  borderRadius: theme.spacing(1),
  width: "45%",
  padding: "8px 16px",
  "& p": {
    fontWeight: 600,
  },
}));

const Profile = () => {
  const { data, isLoading } = useGetMYProfileQuery({});
  console.log(data);

  if (isLoading) return <div>Loading...</div>;

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid xs={4}>
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
        </Grid>
        <Grid xs={8}>
          <Typography variant="h4" color={"primary.main"}>
            Basic Information
          </Typography>
          <Stack
            direction={{ xs: "column", md: "row" }}
            gap={1}
            flexWrap={"wrap"}
          >
            <StyledInformationBox>
              <Typography color={"secondary"} variant="caption">
                Role
              </Typography>
              <Typography>{data?.role}</Typography>
            </StyledInformationBox>
            <StyledInformationBox>
              <Typography color={"secondary"} variant="caption">
                Name
              </Typography>
              <Typography>{data?.name}</Typography>
            </StyledInformationBox>
            <StyledInformationBox>
              <Typography color={"secondary"} variant="caption">
                Email
              </Typography>
              <Typography>{data?.email}</Typography>
            </StyledInformationBox>
            <StyledInformationBox>
              <Typography color={"secondary"} variant="caption">
                Contact Number
              </Typography>
              <Typography>{data?.contactNumber}</Typography>
            </StyledInformationBox>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Profile;
