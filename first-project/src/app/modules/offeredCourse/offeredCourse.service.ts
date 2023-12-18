import { TOfferedCourse } from './offeredCourse.interface'
import { OfferedCourse } from './offeredCourse.model'

const createOfferedCourseIntoDB = async (payload: TOfferedCourse) => {
  const result = await OfferedCourse.create(payload)
  return result
}

const getAllOfferedCoursesFromDB = async (query: any) => {
  const result = await OfferedCourse.find(query)
  return result
}

const getSingleOfferedCourseFromDB = async (id: string) => {
  const result = await OfferedCourse.findOne({ _id: id })
  return result
}

const updateOfferedCourseIntoDB = async (
  id: string,
  payload: TOfferedCourse,
) => {
  const result = await OfferedCourse.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  })
  return result
}

export const offeredCourseService = {
  createOfferedCourseIntoDB,
  getAllOfferedCoursesFromDB,
  getSingleOfferedCourseFromDB,
  updateOfferedCourseIntoDB,
}
