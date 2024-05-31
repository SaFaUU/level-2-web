import { dateFormatter } from "@/utils/dateFormatter";
import { Box, Stack, Typography, styled } from "@mui/material";
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

const DoctorInformation = ({ data }: { data: any }) => {
  return (
    <>
      <Box>
        <Typography variant="h6" color={"primary.main"} my={2}>
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
          <StyledInformationBox>
            <Typography color={"secondary"} variant="caption">
              Designation
            </Typography>
            <Typography>{data?.designation}</Typography>
          </StyledInformationBox>
        </Stack>
      </Box>
      <Box mt={2}>
        <Typography variant="h6" color={"primary.main"} my={2}>
          Professional Information
        </Typography>
        <Stack
          direction={{ xs: "column", md: "row" }}
          gap={1}
          flexWrap={"wrap"}
        >
          <StyledInformationBox>
            <Typography color={"secondary"} variant="caption">
              Appointment Fee
            </Typography>
            <Typography>{data?.appointmentFee}</Typography>
          </StyledInformationBox>
          <StyledInformationBox>
            <Typography color={"secondary"} variant="caption">
              Qualification
            </Typography>
            <Typography>{data?.qualification}</Typography>
          </StyledInformationBox>
          <StyledInformationBox>
            <Typography color={"secondary"} variant="caption">
              Current Working Place
            </Typography>
            <Typography>{data?.currentWorkingPlace}</Typography>
          </StyledInformationBox>
          <StyledInformationBox>
            <Typography color={"secondary"} variant="caption">
              Joined
            </Typography>
            <Typography>{dateFormatter(data?.createdAt)}</Typography>
          </StyledInformationBox>
          <StyledInformationBox>
            <Typography color={"secondary"} variant="caption">
              Current Status
            </Typography>
            <Typography>{data?.status}</Typography>
          </StyledInformationBox>
          <StyledInformationBox>
            <Typography color={"secondary"} variant="caption">
              Average Rating
            </Typography>
            <Typography>{data?.averageRating}</Typography>
          </StyledInformationBox>
          <StyledInformationBox>
            <Typography color={"secondary"} variant="caption">
              Experience
            </Typography>
            <Typography>{data?.experience}</Typography>
          </StyledInformationBox>
        </Stack>
      </Box>
    </>
  );
};

export default DoctorInformation;
