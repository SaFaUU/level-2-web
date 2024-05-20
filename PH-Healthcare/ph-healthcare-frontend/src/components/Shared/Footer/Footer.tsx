import { Box, Button, Container, Stack, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import facebookIcon from "@/assets/landing_page/facebook.png";

const Footer = () => {
  return (
    <Box bgcolor="rgb(17, 26, 34)" py={5}>
      <Container>
        <Stack direction={"row"} gap={4} justifyContent={"center"}>
          <Typography component={Link} href="/consultation" color={"white"}>
            Consultation
          </Typography>
          <Typography component={Link} href="/plans" color={"white"}>
            Health Plans
          </Typography>
          <Typography component={Link} href="/medicine" color={"white"}>
            Medicine
          </Typography>
          <Typography component={Link} href="/diagnostics" color={"white"}>
            Diagnostics
          </Typography>
          <Typography component={Link} href="/ngo" color={"white"}>
            NGOs
          </Typography>
        </Stack>
        <Stack direction={"row"} gap={2} justifyContent={"center"} py={2}>
          <Image src={facebookIcon} alt="facebook" width={30} height={30} />
          <Image src={facebookIcon} alt="facebook" width={30} height={30} />
          <Image src={facebookIcon} alt="facebook" width={30} height={30} />
          <Image src={facebookIcon} alt="facebook" width={30} height={30} />
        </Stack>
        {/* <div className="border-b-[1px] border-dashed"></div> */}
        <Box
          sx={{
            border: "1px solid lightgray",
          }}
        ></Box>
        <Stack
          direction={"row"}
          gap={2}
          justifyContent={"space-between"}
          alignItems={"center"}
          py={2}
        >
          <Typography component={"p"} color={"white"}>
            &copy;2024 PH HealthCare. All Rights Reserved{" "}
          </Typography>
          <Typography
            variant="h4"
            component={Link}
            href="/"
            fontWeight={600}
            color={"white"}
          >
            P
            <Box component={"span"} color={"primary.main"}>
              H
            </Box>{" "}
            Health Care
          </Typography>
          <Typography component={"p"} color={"white"}>
            Privacy Policy! Terms and Conditions
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;
