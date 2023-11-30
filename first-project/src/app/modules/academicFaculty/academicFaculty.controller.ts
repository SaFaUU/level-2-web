import { RequestHandler } from 'express'
import sendResponse from '../../utils/sendResponse'
import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import { AcademicFacultyServices } from './academicFaculty.service'

const createAcademicFaculty: RequestHandler = catchAsync(async (req, res) => {
  const result = await AcademicFacultyServices.createAcademicFacultyIntoDB(
    req.body,
  )

  //send response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Faculty is created succesfully',
    data: result,
  })
})
const getAllAcademicFaculties: RequestHandler = catchAsync(async (req, res) => {
  const result = await AcademicFacultyServices.getAllAcademicFacultiesFromDB()

  //send response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semester is fetched succesfully',
    data: result,
  })
})
const getSingleAcademicFacultyById: RequestHandler = catchAsync(
  async (req, res) => {
    const id = req.params.facultyId
    const result = await AcademicFacultyServices.getSingleAcademicFacultyFromDB(
      id as string,
    )

    //send response
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Faculty is fetched succesfully',
      data: result,
    })
  },
)
const updateAcademicSemesterById: RequestHandler = catchAsync(
  async (req, res) => {
    const id = req.params.facultyId
    const result = await AcademicFacultyServices.updateAcademicFacultyInDB(
      id as string,
      req.body,
    )

    //send response
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Faculty is updated succesfully',
      data: result,
    })
  },
)

export const AcademicFacultyControllers = {
  createAcademicFaculty,
  getAllAcademicFaculties,
  getSingleAcademicFacultyById,
  updateAcademicSemesterById,
}
