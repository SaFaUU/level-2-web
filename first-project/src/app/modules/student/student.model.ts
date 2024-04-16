import { Schema, model } from 'mongoose'
import {
  TGuardian,
  TLocalGuardian,
  TStudent,
  StudentModel,
  TUserName,
} from './student.interface'
import validator from 'validator'
import AppError from '../../errors/AppError'
import httpStatus from 'http-status'
import { User } from '../user/user.model'

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, 'First Name is required'],
    trim: true,
    maxlength: [20, 'First Name Max allowed length is 20'],
    validate: {
      validator: function (value: string) {
        const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1)
        return firstNameStr === value
      },
      message: '{VALUE} is not capitilized properly',
    },
  },
  middleName: {
    type: String,
  },
  lastName: {
    type: String,
    trim: true,
    required: [true, 'Last Name is required'],
    validate: {
      validator: function (value: string) {
        return validator.isAlpha(value)
      },
      message: '{VALUE} is not accepted. Please put Alphabets only',
    },
  },
})

const guardianSchema = new Schema<TGuardian>({
  fatherName: {
    type: String,
    required: [true, 'Father Name is required'],
  },
  fatherOccupation: {
    type: String,
    required: [true, 'Father Occupation is required'],
  },
  fatherContactNo: {
    type: String,
    required: [true, 'Father Contact Number is required'],
  },
  motherName: {
    type: String,
    required: [true, 'Mother Name is required'],
  },
  motherOccupation: {
    type: String,
    required: [true, 'Mother Occupation is required'],
  },
})

const localGuardianSchema = new Schema<TLocalGuardian>({
  name: {
    type: String,
    required: [true, 'Local Guardian Name is required'],
  },
  occupation: {
    type: String,
    required: [true, 'Local Guardian Occupation is required'],
  },
  contactNo: {
    type: String,
    required: [true, 'Local Guardian Contact Number is required'],
  },
  address: {
    type: String,
    required: [true, 'Local Guardian Address is required'],
  },
})

// const studentSchema = new Schema<TStudent, StudentModel, StudentMethods>({
const studentSchema = new Schema<TStudent, StudentModel>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'User id is required'],
      unique: true,
      ref: 'User',
    },

    name: {
      type: userNameSchema,
      required: true,
    },
    gender: {
      type: String,
      trim: true,
      enum: {
        values: ['male', 'female'],
        message: '{VALUE} is not supported',
      },
      required: true,
    },
    dateOfBirth: {
      type: Date,
    },
    email: {
      type: String,
      trim: true,
      required: [true, 'Email is required'],
      unique: true,
      validate: {
        validator: function (email: string) {
          return validator.isEmail(email)
        },
        message: '{VALUE} is not a valid email',
      },
    },
    contactNo: {
      type: String,
      required: [true, 'Contact Number is required'],
    },
    emergencyContactNo: {
      type: String,
      required: [true, 'Emergency Contact Number is required'],
    },
    bloodGroup: {
      type: String,
      trim: true,
      enum: {
        values: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
        message: '{VALUE} is not a valid blood group',
      },
    },
    presentAdress: {
      type: String,
      required: [true, 'Present Address is required'],
    },
    permanentAdress: {
      type: String,
      required: [true, 'Permanent Address is required'],
    },
    guardian: {
      type: guardianSchema,
      required: [true, 'Guardian information is required'],
    },
    localGuardian: {
      type: localGuardianSchema,
      required: [true, 'Local Guardian information is required'],
    },
    profileImg: {
      type: String,
      default: '',
    },
    admissionSemester: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicSemester',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicDepartment',
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicFaculty',
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
)

// Query Middleware
studentSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } })
  next()
})
studentSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } })
  next()
})
studentSchema.pre('findOneAndUpdate', async function (next) {
  const query = this.getQuery()
  const isStudentExists = await Student.findOne(query)
  if (!isStudentExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'This Student does not exist')
  }
  next()
})

studentSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } })
  next()
})

//virtual
studentSchema.virtual('fullName').get(function () {
  return `${this?.name?.firstName} ${this?.name?.middleName} ${this?.name?.lastName}`
})

//creating a custom static method
studentSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await User.findOne({ id })
  return existingUser
}

const Student = model<TStudent, StudentModel>('Student', studentSchema)
export default Student
