"use client";
import { getUserInfo, isLoggedIn, removeUser } from "@/services/auth.service";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const Navbar = () => {
  const AuthButton = dynamic(
    () => import("@/components/UI/HomePage/AuthButton/AuthButton"),
    { ssr: false }
  );

  const userInfo = getUserInfo();
  console.log(userInfo);
  console.log(isLoggedIn());

  const router = useRouter();

  const handleLogOut = () => {
    removeUser();
    router.refresh();
  };
  return (
    <Container>
      <Stack
        py={2}
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Typography variant="h4" component={Link} href="/" fontWeight={600}>
          P
          <Box component={"span"} color={"primary.main"}>
            H
          </Box>{" "}
          Health Care
        </Typography>
        <Stack direction={"row"} gap={4} justifyContent={"space-between"}>
          <Typography component={Link} href="/consultation">
            Consultation
          </Typography>
          <Typography component={Link} href="/plans">
            Health Plans
          </Typography>
          <Typography component={Link} href="/medicine">
            Medicine
          </Typography>
          <Typography component={Link} href="/diagnostics">
            Diagnostics
          </Typography>
          <Typography component={Link} href="/ngo">
            NGOs
          </Typography>
        </Stack>
        <AuthButton />
      </Stack>
    </Container>
  );
};

export default Navbar;
