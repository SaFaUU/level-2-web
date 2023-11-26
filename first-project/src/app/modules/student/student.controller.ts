import { NextFunction, Request, Response } from 'express'
import { StudentServices } from './student.service'
import httpStatus from 'http-status'
import sendResponse from '../../utils/sendResponse'

const getAllStudents = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB()

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Students recived successfully',
      data: result,
    })
  } catch (err) {
    next(err)
  }
}

const getSingleStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params
    const result = await StudentServices.getSingleStudentFromDB(id)

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Single data recieved sucessfully',
      data: result,
    })
  } catch (err) {
    next(err)
  }
}
const deleteStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params
    const result = await StudentServices.deleteStudentFromDB(id)

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Single data deleted sucessfully',
      data: result,
    })
  } catch (err) {
    next(err)
  }
}

export const StudentControllers = {
  getAllStudents,
  getSingleStudent,
  deleteStudent,
}
