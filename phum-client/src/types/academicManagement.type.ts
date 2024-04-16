export type TAcademicSemester = {
  _id: string;
  name: string;
  year: string;
  code: string;
  startMonth: string;
  endMonth: string;
  createdAt: string;
  updatedAt: string;
};

export type TAcademicDepartment = {
  _id: string;
  name: string;
  code: string;
  academicFaculty: string;
  createdAt: string;
  updatedAt: string;
};

export type TAcademicFaculty = {
  _id: string;
  name: string;
  code: string;
  createdAt: string;
  updatedAt: string;
};
