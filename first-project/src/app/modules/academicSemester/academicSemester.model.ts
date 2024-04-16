import { Schema, model } from 'mongoose'
import { TAcademicSemester } from './academicSemester.interface'
import {
  AademicSemesterName,
  AcademicSemesterCode,
  Months,
} from './academicSemester.constants'
import httpStatus from 'http-status'
import AppError from '../../errors/AppError'

const academicSemesterSchema = new Schema<TAcademicSemester>(
  {
    name: {
      type: String,
      required: true,
      enum: AademicSemesterName,
    },
    year: {
      type: String,
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

academicSemesterSchema.pre('save', async function (next) {
  const isSemesterExists = await AcademicSemester.findOne({
    name: this.name,
    year: this.year,
  })
  if (isSemesterExists) {
    throw new AppError(httpStatus.NOT_ACCEPTABLE, 'Semester already Exists!')
  }
  next()
})

export const AcademicSemester = model<TAcademicSemester>(
  'AcademicSemester',
  academicSemesterSchema,
)
