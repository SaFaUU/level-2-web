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
import { useAddSemesterRegistrationMutation } from "../../../redux/features/admin/courseManagement.api";
import PHDatePicker from "../../../components/form/PHDatePicker";

const SemesterRegistration = () => {
  const { data: academicSemester } = useGetAllSemestersQuery([
    { name: "sort", value: "year" },
  ]);

  const [addSemester] = useAddSemesterRegistrationMutation();

  const academicSemesterOptions = academicSemester?.data?.map((sem) => ({
    label: `${sem.name} ${sem.year}`,
    value: sem._id,
  }));

  console.log(academicSemester);
  const onSubmit: SubmitHandler<FieldValues> = async (data: any) => {
    const toastId = toast.loading("Creating Semester Registration...");

    const semesterData = {
      ...data,
      minCredit: Number(data.minCredit),
      maxCredit: Number(data.maxCredit),
    };
    console.log(semesterData);

    try {
      const res = (await addSemester(semesterData)) as TResponse<any>;
      if (res.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success("Semester Registration created successfully", {
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
          <PHSelect
            label="Name"
            name="academicSemester"
            options={academicSemesterOptions}
          ></PHSelect>
          <PHSelect
            label="Status"
            name="status"
            options={semesterStatusOptions}
          ></PHSelect>
          <PHDatePicker name="startDate" label="Start Date"></PHDatePicker>
          <PHDatePicker name="endDate" label="End Date"></PHDatePicker>
          <PHInput
            type="text"
            name="minCredit"
            label="Minimum Credit"
          ></PHInput>
          <PHInput
            type="text"
            name="maxCredit"
            label="Maximum Credit"
          ></PHInput>
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default SemesterRegistration;
