import { academicSemesterNameCodeMapper } from './academicSemester.constants'
import { TAcademicSemester } from './academicSemester.interface'
import { AcademicSemester } from './academicSemester.model'

const createAcademicSemesterIntoDB = async (payload: TAcademicSemester) => {
  if (academicSemesterNameCodeMapper[payload.name] !== payload.code) {
    throw new Error('Invalid Semester Code')
  }
  const result = await AcademicSemester.create(payload)
  return result
}
const getAcademicSemesterFromDB = async () => {
  const result = await AcademicSemester.find({})
  return result
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
    throw new Error('Invalid Semester Code')
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
