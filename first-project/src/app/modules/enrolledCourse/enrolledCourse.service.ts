import httpStatus from 'http-status'
import AppError from '../../errors/AppError'
import { OfferedCourse } from '../offeredCourse/offeredCourse.model'
import { TEnrolledCourse } from './enrolledCourse.interface'
import EnrolledCourse from './enrolledCourse.model'
import Student from '../student/student.model'
import mongoose from 'mongoose'
import { SemesterRegistration } from '../semesterRegistration/semesterRegistration.model'
import { Course } from '../course/course.model'
import { Faculty } from '../faculty/faculty.model'
import { calculateGradeAndPoints } from './enrolledCourse.utils'
import QueryBuilder from '../../builder/QueryBuilder'

const createEnrolledCourseIntoDB = async (
  userId: string,
  payload: TEnrolledCourse,
) => {
  // Check if the course is offered
  const { offeredCourse } = payload
  const isOfferedCourseExists = await OfferedCourse.findById(offeredCourse)

  if (!isOfferedCourseExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Offered Course not found')
  }

  if (isOfferedCourseExists.maxCapacity <= 0) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Course is full')
  }

  const student = await Student.findOne(
    {
      id: userId,
    },
    {
      _id: 1,
    },
  )

  if (!student) {
    throw new AppError(httpStatus.NOT_FOUND, 'Student not found')
  }

  const isStudentAlreadyEnrolled = await EnrolledCourse.findOne({
    semesterRegistration: isOfferedCourseExists.semesterRegistration,
    offeredCourse,
    student: student._id,
  })

  if (isStudentAlreadyEnrolled) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Student already enrolled')
  }

  // check total credits exceeds maxCredit
  const course = await Course.findById(isOfferedCourseExists.course)
  const currentCredit = course?.credits
  const semesterRegistration = await SemesterRegistration.findById(
    isOfferedCourseExists.semesterRegistration,
  ).select('maxCredit')

  const maxCredit = semesterRegistration?.maxCredit

  const enrolledCourses = await EnrolledCourse.aggregate([
    {
      $match: {
        semesterRegistration: isOfferedCourseExists.semesterRegistration,
        student: student._id,
      },
    },
    {
      $lookup: {
        from: 'courses',
        localField: 'course',
        foreignField: '_id',
        as: 'enrolledCourseData',
      },
    },
    {
      $unwind: '$enrolledCourseData',
    },
    {
      $group: {
        _id: null,
        totalEnrolledCredits: {
          $sum: '$enrolledCourseData.credits',
        },
      },
    },
    {
      $project: {
        _id: 0,
      },
    },
  ])
  // total enrolled credits + new enrolled course credit > maxCredit
  const totalCredits =
    enrolledCourses.length > 0 ? enrolledCourses[0].totalEnrolledCredits : 0

  if (totalCredits && maxCredit && totalCredits + currentCredit > maxCredit) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Total credits exceeds max credit',
    )
  }
  const session = await mongoose.startSession()
  try {
    session.startTransaction()

    //create
    const result = await EnrolledCourse.create(
      [
        {
          semesterRegistration: isOfferedCourseExists.semesterRegistration,
          academicSemester: isOfferedCourseExists.academicSemester,
          academicFaculty: isOfferedCourseExists.academicFaculty,
          academicDepartment: isOfferedCourseExists.academicDepartment,
          offeredCourse,
          course: isOfferedCourseExists.course,
          student: student._id,
          faculty: isOfferedCourseExists.faculty,
          isEnrolled: true,
        },
      ],
      { session },
    )
    if (!result) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Course not enrolled')
    }

    const maxCapacity = isOfferedCourseExists.maxCapacity

    await OfferedCourse.findByIdAndUpdate(offeredCourse, {
      maxCapacity: maxCapacity - 1,
    })

    await session.commitTransaction()
    await session.endSession()
    return result
  } catch (error: unknown) {
    await session.abortTransaction()
    await session.endSession()
    throw new AppError(error.statusCode, error.message)
  }
}

const updateEnrolledCourseMarksIntoDB = async (
  facultyId: string,
  payload: Partial<TEnrolledCourse>,
) => {
  const { semesterRegistration, offeredCourse, student, courseMarks } = payload

  const isSemesterRegistrationExists =
    await SemesterRegistration.findById(semesterRegistration)

  if (!isSemesterRegistrationExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Semester registration not found')
  }

  const isOfferedCourseExists = await OfferedCourse.findById(offeredCourse)

  if (!isOfferedCourseExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Offered Course not found')
  }

  const isStudentExists = await Student.findById(student)

  if (!isStudentExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Student not found')
  }

  const faculty = await Faculty.findOne(
    {
      id: facultyId,
    },
    {
      _id: 1,
    },
  )

  if (!faculty) {
    throw new AppError(httpStatus.NOT_FOUND, 'Faculty not found')
  }

  const isCourseBelongToFaculty = await EnrolledCourse.findOne({
    semesterRegistration,
    offeredCourse,
    student,
    faculty: faculty?._id,
  })

  if (!isCourseBelongToFaculty) {
    throw new AppError(httpStatus.FORBIDDEN, 'Course not belongs to faculty')
  }

  const modifiedData: Record<string, unknown> = {
    ...courseMarks,
  }

  if (courseMarks && Object.keys(courseMarks).length) {
    for (const [key, value] of Object.entries(courseMarks)) {
      modifiedData[`courseMarks.${key}`] = value
    }
  }

  if (courseMarks?.finalTerm) {
    const { classTest1, classTest2, midTerm, finalTerm } =
      isCourseBelongToFaculty.courseMarks

    const totalMarks =
      Math.ceil(classTest1) +
      Math.ceil(classTest2) +
      Math.ceil(midTerm) +
      Math.ceil(finalTerm)

    const result = calculateGradeAndPoints(totalMarks)

    modifiedData.grade = result.grade
    modifiedData.gradePoints = result.gradePoints
    modifiedData.isCompleted = true
  }

  const result = await EnrolledCourse.findByIdAndUpdate(
    isCourseBelongToFaculty._id,
    modifiedData,
    {
      new: true,
      runValidators: true,
    },
  )
  return result
}

const getAllEnrolledCoursesFromDB = async (
  facultyId: string,
  query: Record<string, unknown>,
) => {
  const faculty = await Faculty.findOne({ id: facultyId });

  if (!faculty) {
    throw new AppError(httpStatus.NOT_FOUND, 'Faculty not found !');
  }

  const enrolledCourseQuery = new QueryBuilder(
    EnrolledCourse.find({
      faculty: faculty._id,
    }).populate(
      'semesterRegistration academicSemester academicFaculty academicDepartment offeredCourse course faculty student',
    ),
    query,
  )
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await enrolledCourseQuery.modelQuery;
  const meta = await enrolledCourseQuery.countTotal();

  return {
    meta,
    result,
  };
};

const getMyEnrolledCoursesFromDB = async (
  userId: string,
  query: Record<string, unknown>,
) => {
  const student = await Student.findOne({ id: userId }).populate(
    'semesterRegistration academicSemester academicDepartment offeredCourse course student faculty academicFaculty',
  )
  if (!student) {
    throw new AppError(httpStatus.NOT_FOUND, 'Student not found')
  }

  const enrolledCourseQuery = new QueryBuilder(
    EnrolledCourse.find({ student: student._id }),
    query,
  )
    .filter()
    .sort()
    .paginate()
    .fields()

  const result = await enrolledCourseQuery.modelQuery.populate(
    'academicSemester academicDepartment offeredCourse course student faculty academicFaculty',
  )
  const meta = await enrolledCourseQuery.countTotal()
  return { meta, result }
}

export const EnrolledCourseService = {
  createEnrolledCourseIntoDB,
  updateEnrolledCourseMarksIntoDB,
  getAllEnrolledCoursesFromDB,
  getMyEnrolledCoursesFromDB,
}
