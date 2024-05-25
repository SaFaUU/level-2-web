import { Box, Button, Container, Stack, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";

const Specialist = async () => {
  const res = await fetch("http://localhost:5000/api/v1/specialties", {
    next: { revalidate: 30 },
  });
  const { data: specialties } = await res.json();
  console.log(specialties);
  return (
    <Container>
      <Box
        sx={{
          margin: "40px 0px",
          textAlign: "center",
        }}
      >
        <Box sx={{ textAlign: "start" }}>
          <Typography variant="h4" fontWeight={600}>
            Explore Treatments Across Specialties
          </Typography>
          <Typography component={"p"} fontWeight={300} fontSize={18}>
            Experienced Doctors Across All Specialties
          </Typography>
        </Box>
        <Stack direction={"row"} gap={4} mt={5}>
          {specialties.slice(0, 5).map((specialty: any) => (
            <Box
              key={specialty.id}
              sx={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 2,
                backgroundColor: "rgba(245, 245, 245, 1)",
                border: "1px solid rgba(245, 245, 245, 1)",
                borderRadius: "10px",
                textAlign: "center",
                padding: "40px 10px",
                "& img": {
                  width: "50px",
                  height: "50px",
                  margin: "0 auto",
                },
                "&:hover": {
                  border: "1px solid blue",
                  padding: "40px 10px",
                  borderRadius: "10px",
                },
              }}
            >
              <Image
                src={specialty.icon}
                alt={specialty.title}
                width={100}
                height={100}
              />
              <Box>
                <Typography
                  component={"p"}
                  fontWeight={600}
                  fontSize={18}
                  mt={2}
                >
                  {specialty.title}
                </Typography>
              </Box>
            </Box>
          ))}
        </Stack>
        <Button variant="outlined" sx={{ mt: 5 }}>
          View All
        </Button>
      </Box>
    </Container>
  );
};

export default Specialist;
