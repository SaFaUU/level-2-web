import DoctorCard from "@/components/UI/Doctor/DoctorCard";
import ScrollCategory from "@/components/UI/Doctor/ScrollCategory";
import { Box, Container } from "@mui/material";
import React from "react";
import { IDoctor } from "@/types/doctor";
import DashedLine from "@/components/UI/Doctor/DashedLine";

interface PropType {
  searchParams: { specialities: string };
}

const Doctors = async ({ searchParams }: PropType) => {
  let res;

  if (searchParams.specialities) {
    res = await fetch(
      `http://localhost:5000/api/v1/doctor?specialities=${searchParams.specialities}`
    );
  } else {
    res = await fetch("http://localhost:5000/api/v1/doctor");
  }

  const { data } = await res.json();

  return (
    <Container>
      <DashedLine />

      <ScrollCategory specialties={searchParams.specialities} />

      <Box sx={{ mt: 2, p: 3, bgcolor: "secondary.light" }}>
        {data?.data?.map((doctor: IDoctor, index: number) => (
          <Box key={doctor.id}>
            <DoctorCard doctor={doctor} />

            {index === data.length - 1 ? null : <DashedLine />}
          </Box>
        ))}

        {data.length === 0 && <Box>No Doctor Found With This Specialty</Box>}
      </Box>
    </Container>
  );
};

export default Doctors;
