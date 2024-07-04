import { logoutUser } from "@/services/actions/logoutUser";
import { isLoggedIn, removeUser } from "@/services/auth.service";
import { Button } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const AuthButton = () => {
  const router = useRouter();
  const handleLogOut = () => {
    logoutUser(router);
  };

  return (
    <>
      {isLoggedIn() ? (
        <Button color="error" variant="contained" onClick={handleLogOut}>
          Logout
        </Button>
      ) : (
        <Button variant="contained" component={Link} href="/login">
          Login
        </Button>
      )}
    </>
  );
};

export default AuthButton;
