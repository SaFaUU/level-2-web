import QueryBuilder from '../../builder/QueryBuilder'
import { TAcademicDepartment } from './academicDepartment.interface'
import { AcademicDepartment } from './academicDepartment.model'

const createAcademicDepartmentIntoDB = async (payload: TAcademicDepartment) => {
  const result = await AcademicDepartment.create(payload)
  return result
}
const getAllAcademicDepartmentsFromDB = async () => {
  // const result = await AcademicDepartment.find({}).populate('academicFaculty')
  const academicDepartmentsQuery = new QueryBuilder(
    AcademicDepartment.find({}),
    {},
  )
    .filter()
    .sort()
    .fields()
    .paginate()
  const result = await academicDepartmentsQuery.modelQuery
  const meta = await academicDepartmentsQuery.countTotal()

  return {
    meta,
    data: result,
  }
}

const getSingleAcademicDepartmentFromDB = async (id: string) => {
  const result =
    await AcademicDepartment.findById(id).populate('academicFaculty')
  return result
}
const updateAcademicDepartmentInDB = async (
  id: string,
  payload: TAcademicDepartment,
) => {
  const result = await AcademicDepartment.findOneAndUpdate(
    { _id: id },
    payload,
    {
      new: true,
    },
  )
  return result
}

export const AcademicDepartmentServices = {
  createAcademicDepartmentIntoDB,
  getAllAcademicDepartmentsFromDB,
  getSingleAcademicDepartmentFromDB,
  updateAcademicDepartmentInDB,
}
