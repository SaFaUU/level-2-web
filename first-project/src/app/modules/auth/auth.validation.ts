import { z } from 'zod'

const loginValidationSchema = z.object({
  body: z.object({
    id: z.string({
      required_error: 'id is required',
    }),
    password: z.string({
      required_error: 'password is required',
    }),
  }),
})
const changePasswordValidationSchema = z.object({
  body: z.object({
    oldPassword: z.string({
      required_error: 'oldPassword is required',
    }),
    newPassword: z.string({
      required_error: 'newPassword is required',
    }),
  }),
})

const refreshTokenValidationSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: 'refreshToken is required',
    }),
  }),
})

const forgotPasswordValidationSchema = z.object({
  body: z.object({
    id: z.string({
      required_error: 'User id is required',
    }),
  }),
})
const resetPasswordValidationSchema = z.object({
  body: z.object({
    id: z.string({
      required_error: 'User id is required',
    }),
    newPassword: z.string({
      required_error: 'User password is required',
    }),
  }),
})

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJBLTAwMDEiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MDMzNjQ1MDgsImV4cCI6MTcwMzM2NTQwOH0.pcCgT7tZH-xn86RWp2oHwRgjRV1kTygop7WekbeK3LA

export const AuthValidation = {
  loginValidationSchema,
  changePasswordValidationSchema,
  refreshTokenValidationSchema,
  forgotPasswordValidationSchema,
  resetPasswordValidationSchema,
}
