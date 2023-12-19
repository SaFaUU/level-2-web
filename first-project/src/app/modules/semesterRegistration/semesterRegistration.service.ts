import httpStatus from 'http-status'
import AppError from '../../errors/AppError'
import { AcademicSemester } from '../academicSemester/academicSemester.model'
import { TSemesterRegistration } from './semesterRegistration.interface'
import { SemesterRegistration } from './semesterRegistration.model'
import QueryBuilder from '../../builder/QueryBuilder'
import { RegistrationStatus } from './semesterRegistration.constant'
import { OfferedCourse } from '../offeredCourse/offeredCourse.model'
import mongoose from 'mongoose'

const createSemesterRegistrationIntoDB = async (
  payload: TSemesterRegistration,
) => {
  const { academicSemester } = payload

  // Check if there any registered semester that is already "UPCOMING" | "ONGOING"
  const isThereAnyUpcomingOrOngoingSemester =
    await SemesterRegistration.findOne({
      $or: [
        {
          academicSemester,
          status: RegistrationStatus.UPCOMING,
        },
        {
          academicSemester,
          status: RegistrationStatus.ONGOING,
        },
      ],
    })
  if (isThereAnyUpcomingOrOngoingSemester) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `There is already an ${isThereAnyUpcomingOrOngoingSemester.status} registered semester in this academic semester`,
    )
  }

  // check if academic semester exist
  const isAcademicSemesterExist =
    await AcademicSemester.findById(academicSemester)
  if (!isAcademicSemesterExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Academic semester not found')
  }
  // check if semester registration already exists
  const isSemesterRegistrationExists = await SemesterRegistration.findOne({
    academicSemester,
  })
  if (isSemesterRegistrationExists) {
    throw new AppError(
      httpStatus.CONFLICT,
      'Semester registration already exists',
    )
  }

  const result = await SemesterRegistration.create(payload)
  return result
}

const getAllSemesterRegistrationsFromDB = async (
  query: Record<string, unknown>,
) => {
  const semesterRegistrationQuery = new QueryBuilder(
    SemesterRegistration.find().populate('academicSemester'),
    query,
  )
    .filter()
    .sort()
    .paginate()
    .fields()

  const result = await semesterRegistrationQuery.modelQuery
  return result
}

const getSingleSemesterRegistrationFromDB = async (id: string) => {
  const result =
    await SemesterRegistration.findById(id).populate('academicSemester')
  return result
}

const updateSemesterRegistrationIntoDB = async (
  id: string,
  payload: Partial<TSemesterRegistration>,
) => {
  // check if the requested registered semister is exists
  const isSemesterRegistrationExist = await SemesterRegistration.findById(id)
  if (!isSemesterRegistrationExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Semester registration not found')
  }
  // if the requested semester registration is ended, we will not update anything
  const currentSemesterStatus = isSemesterRegistrationExist.status
  const requestedStatus = payload?.status
  if (currentSemesterStatus === RegistrationStatus.ENDED) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `This semester is ${currentSemesterStatus}`,
    )
  }

  // UPCOMING => ONGOING => ENDED
  if (
    currentSemesterStatus === RegistrationStatus.UPCOMING &&
    RegistrationStatus.ENDED
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `You can not change the status from ${currentSemesterStatus} to ${requestedStatus}`,
    )
  }
  if (
    currentSemesterStatus === RegistrationStatus.ONGOING &&
    requestedStatus === RegistrationStatus.UPCOMING
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `You can not change the status from ${currentSemesterStatus} to ${requestedStatus}`,
    )
  }
  const result = await SemesterRegistration.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  })
  return result
}

const deleteSemesterRegistrationFromDB = async (id: string) => {
  const session = await mongoose.startSession()
  try {
    session.startTransaction()
    // check if the requested registered semister is exists
    const isSemesterRegistrationExist = await SemesterRegistration.findById(id)
    if (!isSemesterRegistrationExist) {
      throw new AppError(
        httpStatus.NOT_FOUND,
        'Semester registration not found',
      )
    }

    // if the requested semester registration is ended, we will not update anything
    const currentSemesterStatus = isSemesterRegistrationExist.status
    if (currentSemesterStatus !== RegistrationStatus.UPCOMING) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        `This semester has already ${currentSemesterStatus}. You can not delete it`,
      )
    }

    await OfferedCourse.deleteMany({ semesterRegistration: id })
    const result = await SemesterRegistration.findByIdAndDelete(id)
    await session.commitTransaction()
    return result
  } catch (error) {
    await session.abortTransaction()
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Failed to delete semester registration',
    )
  }
}

export const semesterRegistrationService = {
  createSemesterRegistrationIntoDB,
  getAllSemesterRegistrationsFromDB,
  getSingleSemesterRegistrationFromDB,
  updateSemesterRegistrationIntoDB,
  deleteSemesterRegistrationFromDB,
}
