import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { semesterRegistrationService } from './semesterRegistration.service'

const createSemesterRegistration = catchAsync(async (req, res) => {
  const result =
    await semesterRegistrationService.createSemesterRegistrationIntoDB(req.body)

  //send response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester Registration is created succesfully',
    data: result,
  })
})

const getAllSemesterRegistrations = catchAsync(async (req, res) => {
  const result =
    await semesterRegistrationService.getAllSemesterRegistrationsFromDB(
      req.query,
    )

  //send response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester Registrations is retreieved succesfully',
    data: result,
  })
})

const getSingleSemesterRegistration = catchAsync(async (req, res) => {
  const { id } = req.params
  const result =
    await semesterRegistrationService.getSingleSemesterRegistrationFromDB(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester Registration is retrieved succesfully',
    data: result,
  })
})

const updateSemesterRegistration = catchAsync(async (req, res) => {
  const { id } = req.params
  const result =
    await semesterRegistrationService.updateSemesterRegistrationIntoDB(
      id,
      req.body,
    )
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester Registration is updated succesfully',
    data: result,
  })
})

const deleteSemesterRegistration = catchAsync(async (req, res) => {
  const { id } = req.params
  const result =
    await semesterRegistrationService.deleteSemesterRegistrationFromDB(id)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester Registration is deleted succesfully',
    data: result,
  })
})

export const semesterRegistrationController = {
  createSemesterRegistration,
  getAllSemesterRegistrations,
  getSingleSemesterRegistration,
  updateSemesterRegistration,
  deleteSemesterRegistration,
}
