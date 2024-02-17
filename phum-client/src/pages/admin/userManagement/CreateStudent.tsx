import React from "react";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { Button, Col, Divider, Form, Input, Row } from "antd";
import PHSelect from "../../../components/form/PHSelect";
import { bloodGroupOptions, genderOptions } from "../../../constants/global";
import PHDatePicker from "../../../components/form/PHDatePicker";
import {
  useGetAllDepartmentsQuery,
  useGetAllSemestersQuery,
} from "../../../redux/features/admin/academicManagement.api";
import { useAddStudentMutation } from "../../../redux/features/admin/userManagement.api";
import { Controller } from "react-hook-form";

const studentDummyData = {
  password: "student123",
  student: {
    name: {
      firstName: "Safa11111123",
      middleName: "Doe",
      lastName: "Smith",
    },
    gender: "male",
    dateOfBirth: "1990-01-01",
    bloodGroup: "A+",

    email: "john.doe1234@example.com",
    contactNo: "1234567890",
    emergencyContactNo: "9876543210",
    presentAdress: "123 Main St, City",
    permanentAdress: "456 Oak St, Town",

    guardian: {
      fatherName: "Michael Doe",
      fatherOccupation: "Engineer",
      fatherContactNo: "1112223333",
      motherName: "Emily Doe",
      motherOccupation: "Teacher",
    },
    localGuardian: {
      name: "Alice Johnson",
      occupation: "Doctor",
      contactNo: "5556667777",
      address: "789 Elm St, Village",
    },

    admissionSemester: "65bfb6c29ac947d3602bda51",
    academicDepartment: "65bfb2a09ac947d3602bda4d",
  },
};

const studentDefaultValues = {
  name: {
    firstName: "Safa",
    middleName: "Doe",
    lastName: "Smith",
  },
  gender: "male",
  bloodGroup: "A+",

  email: "john.doe123456@example.com",
  contactNo: "1234567890",
  emergencyContactNo: "9876543210",
  presentAdress: "123 Main St, City",
  permanentAdress: "456 Oak St, Town",

  guardian: {
    fatherName: "Michael Doe",
    fatherOccupation: "Engineer",
    fatherContactNo: "1112223333",
    motherName: "Emily Doe",
    motherOccupation: "Teacher",
  },
  localGuardian: {
    name: "Alice Johnson",
    occupation: "Doctor",
    contactNo: "5556667777",
    address: "789 Elm St, Village",
  },

  admissionSemester: "65bfb6c29ac947d3602bda51",
  academicDepartment: "65bfb2a09ac947d3602bda4d",
};

const CreateStudent = () => {
  const { data: sData, isLoading: sIsLoading } =
    useGetAllSemestersQuery(undefined);

  const { data: dData, isLoading: dIsLoading } =
    useGetAllDepartmentsQuery(undefined);

  const [addStudent, { isLoading, error }] = useAddStudentMutation();

  const departmentOptions = dData?.data?.map((d) => ({
    value: d._id,
    label: d.name,
  }));

  const semesterOptions = sData?.data?.map((s) => ({
    value: s._id,
    label: `${s.name} ${s.year}`,
  }));

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const formData = new FormData();

    const studentData = {
      password: "student123",
      student: data,
    };
    console.log(studentData);

    formData.append("data", JSON.stringify(studentData));
    formData.append("file", data.image);
    addStudent(formData);
  };
  return (
    <Row>
      <Col span={24}>
        <PHForm onSubmit={onSubmit} defaultValues={studentDefaultValues}>
          <Divider orientation="left">Personal Details</Divider>
          <Row gutter={16}>
            <Col span={24} lg={{ span: 8 }} md={{ span: 12 }}>
              <PHInput type="text" name="name.firstName" label="First Name" />
            </Col>
            <Col span={24} lg={{ span: 8 }} md={{ span: 12 }}>
              <PHInput type="text" name="name.middleName" label="Middle Name" />
            </Col>
            <Col span={24} lg={{ span: 8 }} md={{ span: 12 }}>
              <PHInput type="text" name="name.lastName" label="Last Name" />
            </Col>
            <Col span={24} lg={{ span: 8 }} md={{ span: 12 }}>
              <PHSelect name="gender" label="Gender" options={genderOptions} />
            </Col>
            <Col span={24} lg={{ span: 8 }} md={{ span: 12 }}>
              <PHDatePicker name="dateOfBirth" label="Date of Birth" />
            </Col>
            <Col span={24} lg={{ span: 8 }} md={{ span: 12 }}>
              <PHSelect
                name="bloodGroup"
                label="Blood Group"
                options={bloodGroupOptions}
              />
            </Col>
            <Col span={24} lg={{ span: 8 }} md={{ span: 12 }}>
              <Controller
                name="image"
                render={({ field: { onChange, value, ...field } }) => (
                  <Form.Item label="Picture">
                    <Input
                      type="file"
                      value={value?.fileName}
                      {...field}
                      onChange={(e) => onChange(e.target.files?.[0])}
                    />
                  </Form.Item>
                )}
              />
            </Col>
          </Row>

          <Divider orientation="left">Contact Details</Divider>
          <Row gutter={16}>
            <Col span={24} lg={{ span: 8 }} md={{ span: 12 }}>
              <PHInput type="text" name="email" label="Email" />
            </Col>
            <Col span={24} lg={{ span: 8 }} md={{ span: 12 }}>
              <PHInput type="text" name="contactNo" label="Contact No" />
            </Col>
            <Col span={24} lg={{ span: 8 }} md={{ span: 12 }}>
              <PHInput
                type="text"
                name="emergencyContactNo"
                label="Emergency Contact No"
              />
            </Col>
            <Col span={24} lg={{ span: 8 }} md={{ span: 12 }}>
              <PHInput
                type="text"
                name="presentAdress"
                label="Present Adress"
              />
            </Col>
            <Col span={24} lg={{ span: 8 }} md={{ span: 12 }}>
              <PHInput
                type="text"
                name="permanentAdress"
                label="Permanent Adress"
              />
            </Col>
          </Row>

          <Divider orientation="left">Guardian Details</Divider>
          <Row gutter={16}>
            <Col span={24} lg={{ span: 8 }} md={{ span: 12 }}>
              <PHInput
                type="text"
                name="guardian.fatherName"
                label="Father Name"
              />
            </Col>
            <Col span={24} lg={{ span: 8 }} md={{ span: 12 }}>
              <PHInput
                type="text"
                name="guardian.fatherOccupation"
                label="Father Occupation"
              />
            </Col>
            <Col span={24} lg={{ span: 8 }} md={{ span: 12 }}>
              <PHInput
                type="text"
                name="guardian.fatherContactNo"
                label="Father Contact No"
              />
            </Col>
            <Col span={24} lg={{ span: 8 }} md={{ span: 12 }}>
              <PHInput
                type="text"
                name="guardian.motherName"
                label="Mother Name"
              />
            </Col>
            <Col span={24} lg={{ span: 8 }} md={{ span: 12 }}>
              <PHInput
                type="text"
                name="guardian.motherOccupation"
                label="Mother Occupation"
              />
            </Col>
          </Row>

          <Divider orientation="left">Local Guardian Details</Divider>
          <Row gutter={16}>
            <Col span={24} lg={{ span: 8 }} md={{ span: 12 }}>
              <PHInput
                type="text"
                name="localGuardian.name"
                label="Local Guardian Name"
              />
            </Col>
            <Col span={24} lg={{ span: 8 }} md={{ span: 12 }}>
              <PHInput
                type="text"
                name="localGuardian.occupation"
                label="Local Guardian Occupation"
              />
            </Col>
            <Col span={24} lg={{ span: 8 }} md={{ span: 12 }}>
              <PHInput
                type="text"
                name="localGuardian.contactNo"
                label="Local Guardian Contact No"
              />
            </Col>
            <Col span={24} lg={{ span: 8 }} md={{ span: 12 }}>
              <PHInput
                type="text"
                name="localGuardian.address"
                label="Local Guardian Address"
              />
            </Col>
          </Row>

          <Divider orientation="left">Academic Details</Divider>
          <Row gutter={16}>
            <Col span={24} lg={{ span: 8 }} md={{ span: 12 }}>
              <PHSelect
                options={semesterOptions}
                name="admissionSemester"
                label="Admission Semester"
                disabled={sIsLoading}
              />
            </Col>
            <Col span={24} lg={{ span: 8 }} md={{ span: 12 }}>
              <PHSelect
                options={departmentOptions}
                name="academicDepartment"
                label="Academic Department"
                disabled={dIsLoading}
              />
            </Col>
          </Row>
          <Col>
            <Button htmlType="submit">Submit</Button>
          </Col>
        </PHForm>
      </Col>
    </Row>
  );
};

export default CreateStudent;
