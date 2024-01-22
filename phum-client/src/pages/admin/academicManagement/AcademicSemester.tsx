import React from "react";
import { useGetAllSemestersQuery } from "../../../redux/features/academicSemester/academicSemesterApi";

const AcademicSemester = () => {
  const { data } = useGetAllSemestersQuery({});

  console.log(data);
  return (
    <div>
      <h1>AcademicSemester</h1>
    </div>
  );
};

export default AcademicSemester;
