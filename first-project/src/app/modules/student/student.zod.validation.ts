import { z } from 'zod'

// Define validation schema for userName
const userNameSchema = z.object({
  firstName: z
    .string()
    .min(1, { message: 'First Name is required' })
    .max(20, { message: 'First Name Max allowed length is 20' })
    .refine(
      (value) => value.charAt(0).toUpperCase() + value.slice(1) === value,
      {
        message: 'First Name is not capitalized properly',
      },
    ),
  middleName: z.string(),
  lastName: z
    .string()
    .min(1, { message: 'Last Name is required' })
    .refine((value) => /^[a-zA-Z]+$/.test(value), {
      message: 'Last Name is not accepted. Please put Alphabets only',
    }),
})

// Define validation schema for guardian
const guardianValidationSchema = z.object({
  fatherName: z.string().min(1, { message: 'Father Name is required' }),
  fatherOccupation: z
    .string()
    .min(1, { message: 'Father Occupation is required' }),
  fatherContactNo: z
    .string()
    .min(1, { message: 'Father Contact Number is required' }),
  motherName: z.string().min(1, { message: 'Mother Name is required' }),
  motherOccupation: z
    .string()
    .min(1, { message: 'Mother Occupation is required' }),
})

// Define validation schema for localGuardian
const localGuardianValidationSchema = z.object({
  name: z.string().min(1, { message: 'Local Guardian Name is required' }),
  occupation: z
    .string()
    .min(1, { message: 'Local Guardian Occupation is required' }),
  contactNo: z
    .string()
    .min(1, { message: 'Local Guardian Contact Number is required' }),
  address: z.string().min(1, { message: 'Local Guardian Address is required' }),
})

// Define validation schema for student
const createStudentZodValidationSchema = z.object({
  body: z.object({
    password: z.string(),
    student: z.object({
      name: userNameSchema,
      gender: z
        .enum(['male', 'female'])
        .refine((value) => value === 'male' || value === 'female', {
          message: '{VALUE} is not supported',
        }),
      dateOfBirth: z.string(),
      email: z
        .string()
        .email({ message: '{VALUE} is not a valid email' })
        .min(1, { message: 'Email is required' }),
      contactNo: z.string().min(1, { message: 'Contact Number is required' }),
      emergencyContactNo: z
        .string()
        .min(1, { message: 'Emergency Contact Number is required' }),
      bloodGroup: z
        .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
        .refine(
          (value) =>
            ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].includes(value),
          {
            message: '{VALUE} is not a valid blood group',
          },
        ),
      presentAdress: z
        .string()
        .min(1, { message: 'Present Address is required' }),
      permanentAdress: z
        .string()
        .min(1, { message: 'Permanent Address is required' }),
      guardian: guardianValidationSchema,
      localGuardian: localGuardianValidationSchema,
      profileImg: z.string(),
    }),
  }),
})

export const studentValidations = {
  createStudentZodValidationSchema,
}
