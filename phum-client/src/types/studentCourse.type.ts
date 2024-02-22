export type TOfferedCourse {
    _id: string
    semesterRegistration: string
    academicSemester: string
    academicFaculty: string
    academicDepartment: string
    faculty: string
    maxCapacity: number
    section: number
    days: string[]
    startTime: string
    endTime: string
    createdAt: string
    updatedAt: string
    __v: number
    course: TCourse[]
  }
  
  export type TCourse {
    _id: string
    title: string
    prefix: string
    code: number
    credits: number
    isDeleted: boolean
    preRequisiteCourses: any[]
    __v: number
  }
  