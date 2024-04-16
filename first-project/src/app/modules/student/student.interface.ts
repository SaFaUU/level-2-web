import { Model, Types } from 'mongoose'

export type TGuardian = {
  fatherName: string
  fatherOccupation: string
  fatherContactNo: string
  motherName: string
  motherOccupation: string
  motherContactNo: string
}

export type TLocalGuardian = {
  name: string
  occupation: string
  contactNo: string
  address: string
}

export type TUserName = {
  firstName: string
  middleName?: string
  lastName: string
}

export type TStudent = {
  id: string
  user: Types.ObjectId
  password: string
  name: TUserName
  gender: 'male' | 'female'
  dateOfBirth?: Date
  contactNo: string
  emergencyContactNo: string
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-'
  email: string
  presentAdress: string
  permanentAdress: string
  guardian: TGuardian
  localGuardian: TLocalGuardian
  profileImg?: string
  admissionSemester: Types.ObjectId
  isDeleted: boolean
  academicDepartment: Types.ObjectId
  academicFaculty: Types.ObjectId
}

// for creating static
export interface StudentModel extends Model<TStudent> {
  // eslint-disable-next-line no-unused-vars
  isUserExists(id: string): Promise<TStudent | null>
}
