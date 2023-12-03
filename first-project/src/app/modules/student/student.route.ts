import express from 'express'
import { StudentControllers } from './student.controller'
import validateRequest from '../../middlewares/validateRequest'
import { studentValidations } from './student.zod.validation'

const router = express.Router()

// will call controller func
router.get('/', StudentControllers.getAllStudents)

router
  .get('/:id', StudentControllers.getSingleStudent)
  .patch(
    '/:id',
    validateRequest(studentValidations.updateStudentZodValidationSchema),
    StudentControllers.updateStudent,
  )
  .delete('/:id', StudentControllers.deleteStudent)

export const StudentRoutes = router
