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
    message: 'Student is enrolled succesfully',
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
    message: 'Student marks are updated succesfully',
    data: result,
  })
})

const getAllEnrolledCourses = catchAsync(async (req, res) => {
  const facultyId = req.user.userId;

  const result = await EnrolledCourseService.getAllEnrolledCoursesFromDB(
    facultyId,
    req.query,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Enrolled courses are retrieved successfully',
    meta: result.meta,
    data: result.result,
  });
});

const getMyEnrolledCourses = catchAsync(async (req, res) => {
  const userId = req.user.userId
  const result = await EnrolledCourseService.getMyEnrolledCoursesFromDB(
    userId,
    req.query,
  )

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Enrolled Courses are retrieved succesfully',
    meta: result.meta,
    data: result.result,
  })
})

export const EnrolledCourseController = {
  createEnrolledCourse,
  updateEnrolledCourseMarks,
  getAllEnrolledCourses,
  getMyEnrolledCourses,
}
