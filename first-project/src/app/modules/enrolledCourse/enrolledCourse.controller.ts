import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { EnrolledCourseService } from './enrolledCourse.service'

const createEnrolledCourse = catchAsync(async (req, res) => {
  const userId = req.user.userId
  const result = await EnrolledCourseService.createEnrolledCourseIntoDB(
    userId,
    req.body,
  )

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Enrolled Course is created succesfully',
    data: result,
  })
})

const updateEnrolledCourseMarks = catchAsync(async (req, res) => {
  const facultyId = req.user.userId
  const result = await EnrolledCourseService.updateEnrolledCourseMarksIntoDB(
    facultyId,
    req.body,
  )

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Enrolled Course is updated succesfully',
    data: result,
  })
})

const getAllEnrolledCourses = catchAsync(async (req, res) => {
  const userId = req.user.userId
  const result = await EnrolledCourseService.getAllEnrolledCoursesFromDB()

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Enrolled Courses are retrieved succesfully',
    data: result,
  })
})

export const EnrolledCourseController = {
  createEnrolledCourse,
  updateEnrolledCourseMarks,
  getEnrolledCourses: getAllEnrolledCourses,
}
