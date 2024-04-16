import { RequestHandler } from 'express'
import { UserServices } from './user.service'
import sendResponse from '../../utils/sendResponse'
import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'

const createStudent: RequestHandler = catchAsync(async (req, res) => {
  const { password, student: studentData } = req.body

  const result = await UserServices.createStudentIntoDB(
    password,
    studentData,
    req.file,
  )

  //send response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is created succesfully',
    data: result,
  })
})

const createFaculty = catchAsync(async (req, res) => {
  const { password, faculty: facultyData } = req.body

  const result = await UserServices.createFacultyIntoDB(
    req.file,
    password,
    facultyData,
  )

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty is created succesfully',
    data: result,
  })
})

const createAdmin = catchAsync(async (req, res) => {
  const { password, admin: adminData } = req.body

  const result = await UserServices.createAdminIntoDB(
    req.file,
    password,
    adminData,
  )

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin is created succesfully',
    data: result,
  })
})
const getMe = catchAsync(async (req, res) => {
  const { userId, role } = req.user

  const result = await UserServices.getMe(userId, role)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is retrieved succesfully',
    data: result,
  })
})

const changeStatus = catchAsync(async (req, res) => {
  const id = req.params.id
  const result = await UserServices.changeStatus(id, req.body)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User status is changed succesfully',
    data: result,
  })
})

export const UserControllers = {
  createStudent,
  createFaculty,
  createAdmin,
  getMe,
  changeStatus,
}
