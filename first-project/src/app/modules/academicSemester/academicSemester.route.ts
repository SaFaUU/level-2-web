import express from 'express'
import { AcademicSemesterControllers } from './academicSemester.controller'

const router = express.Router()

router.post(
  '/create-academic-semester',
  AcademicSemesterControllers.createAcademicSemester,
)

// will call controller func
// router.get('/', StudentControllers.getAllStudents)

// router
//   .get('/:id', StudentControllers.getSingleStudent)
//   .delete('/:id', StudentControllers.deleteStudent)

export const AcademicSemesterRoutes = router
