import { Button, Col, Flex } from "antd";
import React from "react";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import { useGetAllFacultiesQuery } from "../../../redux/features/admin/userManagement.api";
import PHSelectWithWatch from "../../../components/form/PHSelectWithWatch";
import { SubmitHandler, FieldValues } from "react-hook-form";


const OfferCourse = () => {
  const [id, setId] = React.useState("");
  const {data: academicFacultyData} = useGetAllFacultiesQuery(undefined);
  const academicSemesterOptions = academicFacultyData?.data?.map((item) => ({
    label: item.fullName,
    value: item._id,
  }));
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
  };
  return (
    <Flex justify="center" align="middle" style={{ height: "200vh" }}>
      <Col span={6}>
        <PHForm onSubmit={onSubmit}>
          <PHSelectWithWatch
          onValueChange={(value) => setId(value)}
            label="Name"
            name="academicSemester"
            options={academicSemesterOptions}
          />
          <PHInput type="text" name="test" label="Test" disabled={!id}></PHInput>
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default OfferCourse;
