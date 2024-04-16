import httpStatus from 'http-status'
import AppError from '../../errors/AppError'
import {
  AcademicSemesterSearchableFields,
  academicSemesterNameCodeMapper,
} from './academicSemester.constants'
import { TAcademicSemester } from './academicSemester.interface'
import { AcademicSemester } from './academicSemester.model'
import QueryBuilder from '../../builder/QueryBuilder'

const createAcademicSemesterIntoDB = async (payload: TAcademicSemester) => {
  if (academicSemesterNameCodeMapper[payload.name] !== payload.code) {
    throw new AppError(httpStatus.NOT_ACCEPTABLE, 'Invalid Semester Code')
  }
  const result = await AcademicSemester.create(payload)
  return result
}
const getAcademicSemesterFromDB = async (query: Record<string, unknown>) => {
  const academicSemesterQuery = new QueryBuilder(AcademicSemester.find(), query)
    .search(AcademicSemesterSearchableFields)
    .filter()
    .sort()
    .fields()
    .paginate()
  const result = await academicSemesterQuery.modelQuery
  const meta = await academicSemesterQuery.countTotal()

  return {
    meta,
    data: result,
  }
}

const getAcademicSemesterIDFromDB = async (semesterId: string) => {
  const result = await AcademicSemester.findById(semesterId)
  return result
}
const updateAcademicSemesterInDB = async (
  semesterId: string,
  payload: TAcademicSemester,
) => {
  if (
    payload.name &&
    payload.code &&
    academicSemesterNameCodeMapper[payload.name] !== payload.code
  ) {
    throw new AppError(httpStatus.NOT_ACCEPTABLE, 'Invalid Semester Code')
  }
  const result = await AcademicSemester.findByIdAndUpdate(semesterId, payload)
  return result
}

export const AcademicSemesterServices = {
  createAcademicSemesterIntoDB,
  getAcademicSemesterFromDB,
  getAcademicSemesterIDFromDB,
  updateAcademicSemesterInDB,
}
