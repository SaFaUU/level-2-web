import React from "react";
import PHForm from "../../../components/form/PHForm";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { Button, Col, Flex } from "antd";
import PHSelect from "../../../components/form/PHSelect";
import { monthOptions } from "../../../constants/global";
import { useGetAllSemestersQuery } from "../../../redux/features/admin/academicManagement.api";
import { toast } from "sonner";
import { TResponse } from "../../../types/global";
import PHInput from "../../../components/form/PHInput";
import { semesterStatusOptions } from "../../../constants/semester";
import { useAddCourseMutation, useAddSemesterRegistrationMutation, useGetAllCoursesQuery } from "../../../redux/features/admin/courseManagement.api";
import PHDatePicker from "../../../components/form/PHDatePicker";

const CreateCourse = () => {
  const { data: academicSemester } = useGetAllSemestersQuery([
    { name: "sort", value: "year" },
  ]);

  const {data: courses } = useGetAllCoursesQuery(undefined);

  console.log(courses);

  const [createCourse] = useAddCourseMutation();

  const preRequisiteCoursesOptions = courses?.data?.map((item) => ({
    label: item.title,
    value: item._id,
  }));

  console.log(academicSemester);
  const onSubmit: SubmitHandler<FieldValues> = async (data: any) => {
    const toastId = toast.loading("Creating Semester Registration...");

    const semesterData = {
      ...data,
      code: Number(data.code),
      credits: Number(data.credits),
      
      isDeleted: false,
      preRequisiteCourses: data.preRequisiteCourses ? data.preRequisiteCourses.map((item)=>({
        course: item,
        isDeleted: false
      })) : [],
    }

    console.log(semesterData);

    try {
      const res = (await createCourse(semesterData)) as TResponse<any>;
      if (res.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success("Course created successfully", {
          id: toastId,
        });
      }
    } catch (err) {
      toast.error("Something went wrong", { id: toastId });
    }
  };

  return (
    <Flex justify="center" align="middle" style={{ height: "200vh" }}>
      <Col span={6}>
        <PHForm onSubmit={onSubmit}>
          <PHInput
            type="text"
            name="title"
            label="Title"
          ></PHInput>
          <PHInput
            type="text"
            name="prefix"
            label="Prefix"
          ></PHInput>
          <PHInput
            type="text"
            name="code"
            label="Code"
          ></PHInput>
          <PHInput
            type="text"
            name="credits"
            label="Credits"
          ></PHInput>
          <PHSelect mode="multiple" label="Prerequisite Courses" name="preRequisiteCourses" options={preRequisiteCoursesOptions}/>
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default CreateCourse;
