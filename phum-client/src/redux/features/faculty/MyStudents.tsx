import React from 'react';
import { useParams } from 'react-router-dom';
import { useAddMarkMutation, useGetAllFacultyCoursesQuery } from './facultyCourses.api';
import { Button, Modal, Table, TableColumnsType } from 'antd';
import PHForm from '../../../components/form/PHForm';
import PHInput from '../../../components/form/PHInput';

const MyStudents = () => {
    const { registerSemesterId, courseId } = useParams();
    const {data: facultyCoursesData} = useGetAllFacultyCoursesQuery([
        {
            name: "semesterRegistration",
            value: registerSemesterId
        },
        {
            name: "course",
            value: courseId
        }
    ]);

    console.log(facultyCoursesData);

    const tableData = facultyCoursesData?.data?.map(
        ({ _id, student, semesterRegistration,offeredCourse  }) => ({
          key: _id,
          name: student?.fullName,
          roll: student.id,
          semesterRegistraion: semesterRegistration._id,
          student: student._id,
          offeredCourse: offeredCourse._id
        })
      );

      const columns = [
        {
          title: "Name",
          dataIndex: "name",
          key: "name",
        },
        {
          title: "Roll",
          dataIndex: "roll",
          key: "roll",
        },
        
        {
          title: "Action",
          key: "action",
          render: (item) => (
            <div>
              <AddMarksModal studentInfo={item}/>
            </div>
          ),
        },
      ];

    return (
        <Table
        columns={columns}
        dataSource={tableData}
      />
    );
};

const AddMarksModal = ({studentInfo}) =>{
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [addMark] = useAddMarkMutation();

    const showModal = () => {
      setIsModalOpen(true);
    };
  
    const handleCancel = () => {
      setIsModalOpen(false);
    };
  
    const handleSubmit = async (data) => {
      const studentMark = {
        semesterRegistration: studentInfo.semesterRegistraion,
        student: studentInfo.student,
        offeredCourse: studentInfo.offeredCourse,
        courseMarks: {
            classTest1: Number(data.classTest1),
            midTerm: Number(data.midTerm),
            classTest2: Number(data.classTest2),
            finalTerm: Number(data.finalTerm)
        },
      }
  
      const res = await addMark(studentMark).unwrap();
      console.log(res);
    };
  
    return (
      <>
            <Button onClick={showModal}>
          Add Faculty
        </Button>
        <Modal title="Basic Modal" open={isModalOpen} onCancel={handleCancel} footer={null}>
          <PHForm onSubmit={handleSubmit}>
            <PHInput name='classTest1' label='Class Test 1' type='number'/>
            <PHInput name='midTerm' label='Midterm' type='number'/>
            <PHInput name='classTest2' label='Class Test 2' type='number'/>
            <PHInput name='finalTerm' label='Final Term' type='number'/>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </PHForm>
        </Modal>
      </>
    )
  }
  

export default MyStudents;