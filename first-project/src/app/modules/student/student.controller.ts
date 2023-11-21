import { Request, Response } from 'express'
import { StudentServices } from './student.service'
import studentValidation from './student.joi.validation'
import { z } from 'zod'
import studentZodSchema from './student.zod.validation'

const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: studentData } = req.body

    // creating a schema validation using zod
    const zodParsedData = studentZodSchema.parse(studentData)

    // creating a schema and validation using joi
    // const { error, value } = studentValidation.validate(studentData)

    // if (error) {
    //   res.status(500).json({
    //     success: false,
    //     message: 'Something went wrong',
    //     error,
    //   })
    // }

    // will call service func to send this data
    const result = await StudentServices.createStudentIntoDB(studentData)

    //send response
    res.status(200).json({
      success: true,
      message: 'Student is created succesfully',
      data: result,
    })
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: err,
    })
  }
}

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB()
    res.status(200).json({
      success: true,
      message: 'Students recived successfully',
      data: result,
    })
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: err,
    })
  }
}

const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const result = await StudentServices.getSingleStudentFromDB(id)
    res.status(200).json({
      sucess: true,
      message: 'Single data recieved sucessfully',
      data: result,
    })
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: err,
    })
  }
}
const deleteStudent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const result = await StudentServices.deleteStudentFromDB(id)

    res.status(200).json({
      sucess: true,
      message: 'Single data deleted sucessfully',
      data: result,
    })
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: err,
    })
  }
}

export const StudentControllers = {
  createStudent,
  getAllStudents,
  getSingleStudent,
  deleteStudent,
}
