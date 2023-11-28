import { z } from 'zod'
import {
  AademicSemesterName,
  AcademicSemesterCode,
  Months,
} from './academicSemester.constants'

const createAcademicSemesterValidationSchema = z.object({
  body: z.object({
    name: z.enum([...AademicSemesterName] as [string, ...string[]]),
  }),
  year: z.date(),
  code: z.enum([...AcademicSemesterCode] as [string, ...string[]]),
  startMonth: z.enum([...Months] as [string, ...string[]]),
  endMonth: z.enum([...Months] as [string, ...string[]]),
})

export const AcademicSemesterValidations = {
  createAcademicSemesterValidationSchema,
}
