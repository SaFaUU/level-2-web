import express from 'express'
import { offeredCourseController } from './offeredCourse.controller'
import validateRequest from '../../middlewares/validateRequest'
import { offeredCourseValidations } from './offeredCourse.validation'

const router = express.Router()

router
  .get('/', offeredCourseController.getAllOfferedCourses)
  .get('/:id', offeredCourseController.getSingleOfferedCourse)
  .patch(
    '/:id',
    validateRequest(
      offeredCourseValidations.updateOfferedCourseValidationSchema,
    ),
    offeredCourseController.updateOfferedCourse,
  )
  .post(
    '/create-offered-course',
    validateRequest(
      offeredCourseValidations.createOfferedCourseValidationSchema,
    ),
    offeredCourseController.createOfferedCourse,
  )

export const offeredCourseRoutes = router
