import { RequestHandler } from 'express'
import { StudentServices } from './student.service'
import httpStatus from 'http-status'
import sendResponse from '../../utils/sendResponse'
import catchAsync from '../../utils/catchAsync'
import { CourseServices } from '../course/course.service'

const getAllStudents = catchAsync(async (req, res) => {
  const result = await StudentServices.getAllStudentsFromDB(req.query)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Students recived successfully',
    data: result,
  })
})

const getSingleStudent: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await StudentServices.getSingleStudentFromDB(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single data recieved sucessfully',
    data: result,
  })
})
const deleteStudent: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await StudentServices.deleteStudentFromDB(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single data deleted sucessfully',
    data: result,
  })
})
const updateStudent: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await StudentServices.updateSingleStudentIntoDB(
    id,
    req.body.student,
  )

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single data updated sucessfully',
    data: result,
  })
})

export const StudentControllers = {
  getAllStudents,
  getSingleStudent,
  deleteStudent,
  updateStudent,
}
