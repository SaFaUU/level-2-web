import express from 'express'
import { offeredCourseController } from './offeredCourse.controller'
import validateRequest from '../../middlewares/validateRequest'
import { offeredCourseValidations } from './offeredCourse.validation'
import auth from '../../middlewares/auth'
import { USER_ROLE } from '../user/user.constant'

const router = express.Router()

router
  .get(
    '/',
    auth(USER_ROLE.admin, USER_ROLE.superAdmin, USER_ROLE.faculty),
    offeredCourseController.getAllOfferedCourses,
  )
  .get(
    '/my-offered-courses',
    auth(USER_ROLE.student),
    offeredCourseController.getMyOfferedCourses,
  )
  .get(
    '/:id',
    auth(
      USER_ROLE.admin,
      USER_ROLE.superAdmin,
      USER_ROLE.faculty,
      USER_ROLE.student,
    ),
    offeredCourseController.getSingleOfferedCourse,
  )
  .patch(
    '/:id',
    auth(USER_ROLE.admin, USER_ROLE.superAdmin),
    validateRequest(
      offeredCourseValidations.updateOfferedCourseValidationSchema,
    ),
    offeredCourseController.updateOfferedCourse,
  )
  .post(
    '/create-offered-course',
    auth(USER_ROLE.admin, USER_ROLE.superAdmin),
    validateRequest(
      offeredCourseValidations.createOfferedCourseValidationSchema,
    ),
    offeredCourseController.createOfferedCourse,
  )
  .delete(
    '/:id',
    auth(USER_ROLE.admin, USER_ROLE.superAdmin),
    offeredCourseController.deleteOfferedCourse,
  )

export const offeredCourseRoutes = router
