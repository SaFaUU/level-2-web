import express from 'express'
import { StudentControllers } from './student.controller'
import validateRequest from '../../middlewares/validateRequest'
import { studentValidations } from './student.zod.validation'
import auth from '../../middlewares/auth'
import { USER_ROLE } from '../user/user.constant'

const router = express.Router()

// will call controller func
router.get(
  '/',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  StudentControllers.getAllStudents,
)

router
  .get(
    '/:id',
    auth(USER_ROLE.admin, USER_ROLE.superAdmin, USER_ROLE.faculty),
    StudentControllers.getSingleStudent,
  )
  .patch(
    '/:id',
    auth(USER_ROLE.admin, USER_ROLE.superAdmin),
    validateRequest(studentValidations.updateStudentZodValidationSchema),
    StudentControllers.updateStudent,
  )
  .delete(
    '/:id',
    auth(USER_ROLE.admin, USER_ROLE.superAdmin),
    StudentControllers.deleteStudent,
  )

export const StudentRoutes = router
