import { RequestHandler } from 'express'
import sendResponse from '../../utils/sendResponse'
import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import { AcademicDepartmentServices } from './academicDepartment.service'

const createAcademicDepartment: RequestHandler = catchAsync(
  async (req, res) => {
    const result =
      await AcademicDepartmentServices.createAcademicDepartmentIntoDB(req.body)

    //send response
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Department is created succesfully',
      data: result,
    })
  },
)
const getAllAcademicDepartments: RequestHandler = catchAsync(
  async (req, res) => {
    const result =
      await AcademicDepartmentServices.getAllAcademicDepartmentsFromDB()

    //send response
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Departments are fetched succesfully',
      meta: result.meta,
      data: result.data,
    })
  },
)
const getSingleAcademicDepartmentById: RequestHandler = catchAsync(
  async (req, res) => {
    const id = req.params.departmentId
    const result =
      await AcademicDepartmentServices.getSingleAcademicDepartmentFromDB(
        id as string,
      )

    //send response
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Department is fetched succesfully',
      data: result,
    })
  },
)
const updateAcademicDepartmentById: RequestHandler = catchAsync(
  async (req, res) => {
    const id = req.params.departmentId
    const result =
      await AcademicDepartmentServices.updateAcademicDepartmentInDB(
        id as string,
        req.body,
      )

    //send response
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Department is updated succesfully',
      data: result,
    })
  },
)

export const AcademicDepartmentControllers = {
  createAcademicDepartment,
  getAllAcademicDepartments,
  getSingleAcademicDepartmentById,
  updateAcademicDepartmentById,
}
