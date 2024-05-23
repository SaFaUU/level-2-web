"use client";
import assets from "@/assets";
import PHForm from "@/components/Forms/PHForm";
import PHInput from "@/components/Forms/PHInput";
import { registerPatient } from "@/services/actions/registerPatient";
import { userLogin } from "@/services/actions/userLogin";
import { storeUserInfo } from "@/services/auth.service";
import { modifyPayload } from "@/utils/modifyPayload";
import {
  Box,
  Button,
  Container,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export const patientValidationSchema = z.object({
  patient: z.object({
    name: z
      .string()
      .min(3, "Please enter a valid name")
      .max(50, "Please enter a valid name"),
    email: z
      .string()
      .email("Please enter a valid email")
      .max(50, "Please enter a valid email"),
    contactNumber: z
      .string()
      .regex(/^\d{11}$/, "Please enter a valid contact number"),
    address: z
      .string()
      .min(3, "Please enter a valid address")
      .max(50, "Please enter a valid address"),
  }),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const defaultValues = {
  patient: {
    name: "",
    email: "",
    contactNumber: "",
    address: "",
  },
  password: "",
};

type Inputs = {
  patient: {
    name: string;
    email: string;
    contactNumber: string;
    address: string;
  };
  password: string;
};

const RegisterPage = () => {
  const router = useRouter();

  const handleRegister = async (values: FieldValues) => {
    const data = modifyPayload(values);
    try {
      const res = await registerPatient(data);
      if (res.success) {
        toast.success(res.message);
        const userResponse = await userLogin({
          email: values.patient.email,
          password: values.password,
        });
        console.log(userResponse);
        if (userResponse.success) {
          storeUserInfo(userResponse.data.accessToken);
          router.push("/dashboard");
        }
      }
    } catch (err: any) {
      console.log(err.message);
    }
  };

  return (
    <Container>
      <Stack
        sx={{
          justifyContent: "center",
          alignItems: "center",
          padding: "50px",
          height: "100vh",
        }}
      >
        <Box
          sx={{
            maxWidth: "600px",
            width: "100%",
            boxShadow: 1,
            borderRadius: 1,
            p: 4,
            textAlign: "center",
          }}
        >
          <Stack
            sx={{
              justifyContent: "center",
              alignItems: "center",
              padding: "50px",
            }}
          >
            <Box>
              <Image src={assets.svgs.logo} alt="logo" width={50} height={50} />
            </Box>
            <Box>
              <Typography variant="h6" fontWeight={600}>
                Patient register
              </Typography>
            </Box>
          </Stack>
          <Box>
            <PHForm
              onSubmit={handleRegister}
              resolver={zodResolver(patientValidationSchema)}
              defaultValues={defaultValues}
            >
              <Grid container spacing={2}>
                <Grid item md={12}>
                  <PHInput
                    name="patient.name"
                    label="Name"
                    size="small"
                    fullWidth={true}
                  />
                </Grid>
                <Grid item md={6}>
                  <PHInput
                    name="patient.email"
                    label="Email"
                    type="email"
                    size="small"
                    fullWidth={true}
                  />
                </Grid>
                <Grid item md={6}>
                  <PHInput
                    name="password"
                    label="Password"
                    type="password"
                    size="small"
                    fullWidth={true}
                  />
                </Grid>
                <Grid item md={6}>
                  <PHInput
                    name={"patient.contactNumber"}
                    label="Contact Number"
                    type="tel"
                    size="small"
                    fullWidth={true}
                  />
                </Grid>
                <Grid item md={6}>
                  <PHInput
                    name="patient.address"
                    label="Address"
                    type="text"
                    size="small"
                    fullWidth={true}
                  />
                </Grid>
              </Grid>
              <Button
                fullWidth
                sx={{
                  my: 2,
                }}
                type="submit"
              >
                Register
              </Button>
              <Typography component="p" fontWeight={300}>
                Do you already have an account ?{" "}
                <Link href="/login">Login</Link>
              </Typography>
            </PHForm>
          </Box>
        </Box>
      </Stack>
    </Container>
  );
};

export default RegisterPage;
