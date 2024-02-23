import React from "react";
import { useGetAllFacultyCoursesQuery } from "../../redux/features/faculty/facultyCourses.api";
import PHForm from "../../components/form/PHForm";
import PHSelect from "../../components/form/PHSelect";
import { Button, Col, Flex } from "antd";

const MyCourses = () => {
  const {data: facultyCoursesData} = useGetAllFacultyCoursesQuery(undefined);
  console.log(facultyCoursesData);

  const semesterOptions = facultyCoursesData?.data?.map((item) => ({
    label: `${item.academicSemester.name} ${item.academicSemester.year}`,
    value: item.semesterRegistration._id,
  }));

  const courseOptions = facultyCoursesData?.data?.map((item) => ({
    label: item.course.title,
    value: item.course._id,
  }));

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <Flex justify="center" align="center">
      <Col span={6}>
      <PHForm onSubmit={onSubmit}>
      <PHSelect options={semesterOptions} name="semesterRegistration" label="Semester" />
      <PHSelect options={courseOptions} name="course" label="Course" />
      <Button htmlType="submit">Submit</Button>
    </PHForm>
      </Col>
    </Flex>
  );
};

export default MyCourses;
