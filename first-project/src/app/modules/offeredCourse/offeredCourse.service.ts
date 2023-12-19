import httpStatus from 'http-status'
import AppError from '../../errors/AppError'
import { SemesterRegistration } from '../semesterRegistration/semesterRegistration.model'
import { TOfferedCourse } from './offeredCourse.interface'
import { OfferedCourse } from './offeredCourse.model'
import { AcademicFaculty } from '../academicFaculty/academicFaculty.model'
import { AcademicDepartment } from '../academicDepartment/academicDepartment.model'
import { Course } from '../course/course.model'
import { Faculty } from '../faculty/faculty.model'
import { hasTimeConflict } from './offeredCourse.utils'

const createOfferedCourseIntoDB = async (payload: TOfferedCourse) => {
  const {
    semesterRegistration,
    academicFaculty,
    academicDepartment,
    course,
    faculty,
    section,
    days,
    startTime,
    endTime,
  } = payload
  // check if the semester registration id is exists
  const isSemesterRegistrationExists =
    await SemesterRegistration.findById(semesterRegistration)

  if (!isSemesterRegistrationExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Semester Registration not found')
  }

  const isAcademicFacultyExists =
    await AcademicFaculty.findById(academicFaculty)
  if (!isAcademicFacultyExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Academic Faculty not found in the database',
    )
  }

  const isAcademicDepartmentExists =
    await AcademicDepartment.findById(academicDepartment)
  if (!isAcademicDepartmentExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Academic department not found in the database',
    )
  }

  const isCourseExists = await Course.findById(course)
  if (!isCourseExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Course not found in the database')
  }

  const isFacultyExists = await Faculty.findById(faculty)
  if (!isFacultyExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Faculty not found in the database',
    )
  }
  // check if the department belongs to the faculty
  const isDepartmentBelongToFaculty = await AcademicDepartment.findOne({
    _id: academicDepartment,
    academicFaculty: academicFaculty,
  })
  if (!isDepartmentBelongToFaculty) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `${isAcademicFacultyExists.name} does not belong to ${isAcademicDepartmentExists.name}`,
    )
  }

  // check if the same offered course same section in same registered semester exists
  const isSameOfferedCourseExistsWithSameRegisteredSemesterWithSameSection =
    await OfferedCourse.findOne({
      course,
      semesterRegistration,
      section,
    })
  if (isSameOfferedCourseExistsWithSameRegisteredSemesterWithSameSection) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Offered course with same section already exists',
    )
  }

  // get the schedules of the faculties
  const assignedSchedules = await OfferedCourse.find({
    semesterRegistration,
    faculty,
    days: { $in: days },
  }).select('days startTime endTime')

  const newSchedule = {
    days,
    startTime,
    endTime,
  }

  if (hasTimeConflict(assignedSchedules, newSchedule)) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Time Conflict with other offered course for the faculty',
    )
  }
  const academicSemester = isSemesterRegistrationExists.academicSemester

  const result = await OfferedCourse.create({
    ...payload,
    academicSemester,
  })
  return result
}

const getAllOfferedCoursesFromDB = async (query: any) => {
  const result = await OfferedCourse.find(query)
  return result
}

const getSingleOfferedCourseFromDB = async (id: string) => {
  const result = await OfferedCourse.findOne({ _id: id })
  return result
}

const updateOfferedCourseIntoDB = async (
  id: string,
  payload: Pick<TOfferedCourse, 'faculty' | 'days' | 'startTime' | 'endTime'>,
) => {
  const { faculty, days, startTime, endTime } = payload
  const isOfferedCourseExists = await OfferedCourse.findById(id)
  if (!isOfferedCourseExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Offered Course not found')
  }

  const isFacultyExists = await Faculty.findById(faculty)
  if (!isFacultyExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Faculty not found in the database',
    )
  }

  const semesterRegistration = isOfferedCourseExists.semesterRegistration
  // get the schedules of the faculties
  const semesterRegistrationStatus =
    await SemesterRegistration.findById(semesterRegistration)
  if (semesterRegistrationStatus?.status !== 'UPCOMING') {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `You can't update the offered course as it is ${semesterRegistrationStatus?.status}`,
    )
  }
  const assignedSchedules = await OfferedCourse.find({
    semesterRegistration,
    faculty,
    days: { $in: days },
  }).select('days startTime endTime')

  const newSchedule = {
    days,
    startTime,
    endTime,
  }

  if (hasTimeConflict(assignedSchedules, newSchedule)) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Time Conflict with other offered course for the faculty',
    )
  }
  const result = await OfferedCourse.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  })
  return result
}

const deleteOfferedCourseFromDB = async (id: string) => {
  const semesterRegistrationStatus = await SemesterRegistration.findById(id)
  if (semesterRegistrationStatus?.status !== 'UPCOMING') {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `You can't delete the offered course as it is ${semesterRegistrationStatus?.status}`,
    )
  }
  const result = await OfferedCourse.findByIdAndDelete(id)
  return result
}

export const offeredCourseService = {
  createOfferedCourseIntoDB,
  getAllOfferedCoursesFromDB,
  getSingleOfferedCourseFromDB,
  updateOfferedCourseIntoDB,
  deleteOfferedCourseFromDB,
}
