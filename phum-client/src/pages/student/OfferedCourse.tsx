import React from "react";
import { useGetAllOfferedCoursesQuery } from "../../redux/features/student/studentCourseManagement.api";

const OfferedCourse = () => {
  const {data} = useGetAllOfferedCoursesQuery(undefined);
  console.log(data);
  return (
    <div>
      <h1>Offered Course</h1>
    </div>
  );
};

export default OfferedCourse;
