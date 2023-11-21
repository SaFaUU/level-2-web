import express from 'express'
import { StudentControllers } from './student.controller'

const router = express.Router()

// will call controller func
router
  .post('/create-student', StudentControllers.createStudent)
  .get('/', StudentControllers.getAllStudents)

router
  .get('/:id', StudentControllers.getSingleStudent)
  .delete('/:id', StudentControllers.deleteStudent)

export const StudentRoutes = router
