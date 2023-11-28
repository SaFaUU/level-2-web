import { Schema, model } from 'mongoose'
import { TAcademicSemester } from './academicSemester.interface'
import {
  AademicSemesterName,
  AcademicSemesterCode,
  Months,
} from './academicSemester.constants'

const academicSemesterSchema = new Schema<TAcademicSemester>(
  {
    name: {
      type: String,
      required: true,
      enum: AademicSemesterName,
    },
    year: {
      type: Date,
      required: [true, 'Year is required'],
    },
    code: {
      type: String,
      required: true,
      enum: AcademicSemesterCode,
    },
    startMonth: {
      type: String,
      required: true,
      enum: Months,
    },
    endMonth: {
      type: String,
      required: true,
      enum: Months,
    },
  },
  {
    timestamps: true,
  },
)

export const AcademicSemester = model<TAcademicSemester>(
  'AcademicSemester',
  academicSemesterSchema,
)
