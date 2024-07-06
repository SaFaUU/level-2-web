import assets from "@/assets";
import { Box, Container, Grid, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import searchIcon from "@/assets/icons/search-icon.png";
import doctorIcon from "@/assets/icons/doctor-icon.png";
import appointmentIcon from "@/assets/icons/appointment-icon.png";
import charityIcon from "@/assets/icons/charity-icon.png";
import Stack from "@mui/material/Stack";

const HowItWorks = () => {
  return (
    <Container sx={{ my: 10 }}>
      <Box
        sx={{
          width: "50%",
        }}
      >
        <Typography variant="h6" color={"primary.main"} fontWeight={400}>
          How it works
        </Typography>
        <Typography fontWeight={600} variant="h4" my={2}>
          4 Easy Steps to get Your Solution
        </Typography>
        <Typography component={"p"} fontWeight={400}>
          Access to expert physicians and surgeons, advanced technologies and
          top-quality surgery facilities right here
        </Typography>
      </Box>
      <Grid container>
        <Grid
          item
          md={2}
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
          my={5}
          width={"100%"}
        >
          <Box sx={{ width: "50%" }}>
            <Image src={assets.images.howItWorks} alt="grid" />
          </Box>
          <Box sx={{ width: "50%" }}>
            <Grid container spacing={2}>
              <Grid item md={6}>
                <Box
                  sx={{
                    textAlign: "start",
                    border: "1px solid rgba(20, 20, 20, 0.1)",
                    padding: "15px",
                    borderRadius: "10px",
                  }}
                >
                  <Stack>
                    <Image src={searchIcon} alt="grid" />
                    <Typography variant="h6" component={"h1"} my={2}>
                      Search Doctor
                    </Typography>
                    <Typography component={"p"} fontWeight={400}>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Quisquam dolores aliquid voluptas.
                    </Typography>
                  </Stack>
                </Box>
              </Grid>
              <Grid item md={6}>
                <Box
                  sx={{
                    textAlign: "start",
                    border: "1px solid rgba(20, 20, 20, 0.1)",
                    padding: "15px",
                    borderRadius: "10px",
                  }}
                >
                  <Stack>
                    <Image src={searchIcon} alt="grid" />
                    <Typography variant="h6" component={"h1"} my={2}>
                      Search Doctor
                    </Typography>
                    <Typography component={"p"} fontWeight={400}>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Quisquam dolores aliquid voluptas.
                    </Typography>
                  </Stack>
                </Box>
              </Grid>
              <Grid item md={6}>
                <Box
                  sx={{
                    textAlign: "start",
                    border: "1px solid rgba(20, 20, 20, 0.1)",
                    padding: "15px",
                    borderRadius: "10px",
                  }}
                >
                  <Stack>
                    <Image src={searchIcon} alt="grid" />
                    <Typography variant="h6" component={"h1"} my={2}>
                      Search Doctor
                    </Typography>
                    <Typography component={"p"} fontWeight={400}>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Quisquam dolores aliquid voluptas.
                    </Typography>
                  </Stack>
                </Box>
              </Grid>
              <Grid item md={6}>
                <Box
                  sx={{
                    textAlign: "start",
                    border: "1px solid rgba(20, 20, 20, 0.1)",
                    padding: "15px",
                    borderRadius: "10px",
                  }}
                >
                  <Stack>
                    <Image src={searchIcon} alt="grid" />
                    <Typography variant="h6" component={"h1"} my={2}>
                      Search Doctor
                    </Typography>
                    <Typography component={"p"} fontWeight={400}>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Quisquam dolores aliquid voluptas.
                    </Typography>
                  </Stack>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default HowItWorks;
