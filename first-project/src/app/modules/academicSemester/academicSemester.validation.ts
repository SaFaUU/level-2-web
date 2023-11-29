import { z } from 'zod'
import {
  AademicSemesterName,
  AcademicSemesterCode,
  Months,
} from './academicSemester.constants'

const createAcademicSemesterValidationSchema = z.object({
  body: z.object({
    name: z.enum([...AademicSemesterName] as [string, ...string[]]),
    year: z.string(),
    code: z.enum([...AcademicSemesterCode] as [string, ...string[]]),
    startMonth: z.enum([...Months] as [string, ...string[]]),
    endMonth: z.enum([...Months] as [string, ...string[]]),
  }),
})
const updateAcademicSemesterValidationSchema = z.object({
  body: z.object({
    name: z.enum([...AademicSemesterName] as [string, ...string[]]).optional(),
    year: z.string().optional(),
    code: z.enum([...AcademicSemesterCode] as [string, ...string[]]).optional(),
    startMonth: z.enum([...Months] as [string, ...string[]]).optional(),
    endMonth: z.enum([...Months] as [string, ...string[]]).optional(),
  }),
})

export const AcademicSemesterValidations = {
  createAcademicSemesterValidationSchema,
  updateAcademicSemesterValidationSchema,
}
