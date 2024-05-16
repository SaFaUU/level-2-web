import { Box, Container, Typography } from "@mui/material";
import React from "react";

const WhyUs = () => {
  return (
    <Container>
      <Box>
        <Box sx={{ textAlign: "center" }}>
          <Typography
            color={"primary"}
            variant="h6"
            fontWeight={700}
            component={"h1"}
          >
            Why Us
          </Typography>
          <Typography
            variant="h4"
            fontWeight={700}
            component={"h1"}
            sx={{ my: 3 }}
          >
            Why Choose Us
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default WhyUs;
