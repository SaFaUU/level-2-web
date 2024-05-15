import { Box, Button, Container, Typography } from "@mui/material";
import Image from "next/image";
import { relative } from "path";
import React from "react";
import assets from "@/assets";

const HeroSection = () => {
  return (
    <Container
      sx={{ display: "flex", justifyContent: "space-between", my: 16 }}
    >
      <Box
        sx={{
          flex: 1,
          position: "relative",
          gap: 4,
        }}
      >
        <Box
          sx={{
            position: "absolute",
            width: "700px",
            left: "-120px",
            top: "-90px",
          }}
          gap={4}
        >
          <Image src={assets.svgs.grid} alt="grid" />
        </Box>
        <Typography variant="h3" component={"h1"} fontWeight={"600"}>
          Healthier Hearts
        </Typography>
        <Typography variant="h3" component={"h1"} fontWeight={"600"}>
          Comes From
        </Typography>
        <Typography
          variant="h3"
          component={"h1"}
          color={"primary.main"}
          fontWeight={"600"}
        >
          Preventive Care
        </Typography>
        <Typography
          variant="h6"
          component={"p"}
          fontWeight={"300"}
          sx={{
            my: 2,
          }}
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum ducimus
          molestias cupiditate.
        </Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button variant="contained" color="primary">
            Make Appointment
          </Button>
          <Button variant="outlined">Contact Us</Button>
        </Box>
      </Box>
      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          position: "relative",
          p: 1,
          mt: 0,
        }}
      >
        <Box sx={{ position: "absolute", top: "-30px", left: "200px" }}>
          <Image src={assets.svgs.arrow} alt="arrow" width={100} height={100} />
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: 2,
          }}
        >
          <Box
            sx={{
              mt: 4,
            }}
          >
            <Image
              src={assets.images.doctor1}
              alt="doctor1"
              width={240}
              height={380}
            />
          </Box>
          <Box>
            <Image
              src={assets.images.doctor2}
              alt="doctor2"
              width={240}
              height={350}
            />
          </Box>
          <Box></Box>
        </Box>
        <Box sx={{ position: "absolute", top: "220px", left: "150px" }}>
          <Image
            src={assets.images.doctor3}
            alt="doctor3"
            height={240}
            width={240}
          />
        </Box>
        <Box
          sx={{
            position: "absolute",
            bottom: "-50px",
            right: "0px",
            zIndex: -1,
          }}
        >
          <Image
            src={assets.images.stethoscope}
            alt="stethoscope"
            height={180}
            width={180}
          />
        </Box>
      </Box>
    </Container>
  );
};

export default HeroSection;
