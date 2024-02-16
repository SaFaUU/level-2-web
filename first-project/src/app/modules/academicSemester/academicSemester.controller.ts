import { RequestHandler } from 'express'
import sendResponse from '../../utils/sendResponse'
import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import { AcademicSemesterServices } from './academicSemester.service'

const createAcademicSemester: RequestHandler = catchAsync(async (req, res) => {
  const result = await AcademicSemesterServices.createAcademicSemesterIntoDB(
    req.body,
  )

  //send response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semester is created succesfully',
    data: result,
  })
})
const getAcademicSemester: RequestHandler = catchAsync(async (req, res) => {
  const result = await AcademicSemesterServices.getAcademicSemesterFromDB(
    req.query,
  )

  //send response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semester is fetched succesfully',
    meta: result.meta,
    data: result.data,
  })
})
const getAcademicSemesterById: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.semesterId
  const result = await AcademicSemesterServices.getAcademicSemesterIDFromDB(
    id as string,
  )

  //send response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semester is fetched succesfully',
    data: result,
  })
})
const updateAcademicSemesterById: RequestHandler = catchAsync(
  async (req, res) => {
    const id = req.params.semesterId
    const result = await AcademicSemesterServices.updateAcademicSemesterInDB(
      id as string,
      req.body,
    )

    //send response
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Semester is updated succesfully',
      data: result,
    })
  },
)

export const AcademicSemesterControllers = {
  createAcademicSemester,
  getAcademicSemester,
  getAcademicSemesterById,
  updateAcademicSemesterById,
}
