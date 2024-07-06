import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import Image from "next/image";
import React from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Link from "next/link";

const TopRatedDoctors = async () => {
  const res = await fetch(
    "http://localhost:5000/api/v1/doctor?page=1&limit=3",
    {
      next: { revalidate: 30 },
    }
  );
  const { data: doctors } = await res.json();

  return (
    <Box
      sx={{
        my: 10,
        py: 30,
        backgroundColor: "rgba(20, 20, 20, 0.1)",
        clipPath: "polygon(0 0, 100% 25%, 100% 100%, 0% 75%)",
      }}
    >
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="h4" fontWeight={700} component={"h1"}>
          Our Top Rated Doctors
        </Typography>
        <Typography
          fontSize={18}
          fontWeight={700}
          component={"p"}
          sx={{ mt: 2 }}
        >
          Access to expert physicians and surgeons, advanced technologies
        </Typography>
        <Typography fontSize={18} fontWeight={700} component={"p"}>
          and top-quality surgery facilities right here.
        </Typography>
      </Box>
      <Container sx={{ margin: "30px auto" }}>
        <Grid container spacing={2}>
          {doctors?.data?.map((doctor: any) => (
            <Grid item xs={6} md={4} key={doctor.id}>
              <Card>
                <Box>
                  <Image
                    src={doctor.profilePhoto}
                    alt="doctor"
                    width={400}
                    height={400}
                  />
                </Box>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {doctor.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {doctor.qualification}, {doctor.designation}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 1 }}
                  >
                    <LocationOnIcon /> {doctor.address}
                  </Typography>
                </CardContent>
                <CardActions
                  sx={{
                    justifyContent: "space-between",
                    px: 2,
                    paddingBottom: "20px",
                  }}
                >
                  <Button>Book Now</Button>
                  <Button variant="outlined">View Profile</Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Box sx={{ margin: "0 auto", textAlign: "center" }}>
          <Button
            variant="outlined"
            sx={{ mt: 5 }}
            component={Link}
            href="/doctors"
          >
            View All
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default TopRatedDoctors;
