import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { offeredCourseService } from './offeredCourse.service'

const createOfferedCourse = catchAsync(async (req, res) => {
  const result = await offeredCourseService.createOfferedCourseIntoDB(req.body)
  //send response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Offered Course is created succesfully',
    data: result,
  })
})

const getAllOfferedCourses = catchAsync(async (req, res) => {
  const result = await offeredCourseService.getAllOfferedCoursesFromDB(
    req.query,
  )
  //send response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Offered Courses are retreived succesfully',
    meta: result.meta,
    data: result.data,
  })
})

const getMyOfferedCourses = catchAsync(async (req, res) => {
  const userId = req.user.userId
  const result = await offeredCourseService.getMyOfferedCoursesFromDB(
    userId,
    req.query,
  )
  //send response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Offered Courses are retreived succesfully',
    meta: result.meta,
    data: result.data,
  })
})

const getSingleOfferedCourse = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await offeredCourseService.getSingleOfferedCourseFromDB(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Offered Course is retrieved succesfully',
    data: result,
  })
})

const updateOfferedCourse = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await offeredCourseService.updateOfferedCourseIntoDB(
    id,
    req.body,
  )
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Offered Course is updated succesfully',
    data: result,
  })
})

const deleteOfferedCourse = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await offeredCourseService.deleteOfferedCourseFromDB(id)
  //send response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Offered Course is deleted succesfully',
    data: result,
  })
})

export const offeredCourseController = {
  createOfferedCourse,
  getAllOfferedCourses,
  getMyOfferedCourses,
  getSingleOfferedCourse,
  updateOfferedCourse,
  deleteOfferedCourse,
}
