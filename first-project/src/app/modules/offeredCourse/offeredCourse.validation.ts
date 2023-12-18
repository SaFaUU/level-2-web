import { z } from 'zod'
import { Days } from './offeredCourse.constant'

const createOfferedCourseValidationSchema = z.object({
  body: z
    .object({
      semesterRegistration: z.string(),
      academicFaculty: z.string(),
      academicDepartment: z.string(),
      course: z.string(),
      faculty: z.string(),
      maxCapacity: z.number(),
      section: z.number(),
      days: z.array(z.enum([...Days] as [string, ...string[]])),
      startTime: z.string().refine((value) => /^\d{2}:\d{2}$/.test(value), {
        message: 'Invalid time format, expected HH:MM',
      }), //HH:MM
      endTime: z.string().refine((value) => /^\d{2}:\d{2}$/.test(value), {
        message: 'Invalid time format, expected HH:MM',
      }),
    })
    .refine(
      (data) => {
        const start = new Date(`1970-01-01T${data.startTime}:00`)
        const end = new Date(`1970-01-01T${data.endTime}:00`)
        return start < end
      },
      {
        message: 'Start time must be before end time',
        path: ['endTime'],
      },
    ),
})

const updateOfferedCourseValidationSchema = z.object({
  body: z.object({
    faculty: z.string().optional(),
    maxCapacity: z.number().optional(),
    section: z.number().optional(),
    days: z.enum([...Days] as [string, ...string[]]).optional(),
    startTime: z
      .string()
      .refine((value) => /^[01]?[0-9]:[0-5][0-9]$/.test(value), {
        message: 'Invalid time format, expected HH:MM',
      })
      .optional(),
    endTime: z
      .string()
      .refine((value) => /^[01]?[0-9]:[0-5][0-9]$/.test(value), {
        message: 'Invalid time format, expected HH:MM',
      })
      .optional(),
  }),
})

export const offeredCourseValidations = {
  createOfferedCourseValidationSchema,
  updateOfferedCourseValidationSchema,
}
