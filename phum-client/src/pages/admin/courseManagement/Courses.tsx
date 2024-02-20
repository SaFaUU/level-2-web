import React from "react";
import {
  Button,
  Dropdown,
  Modal,
  Table,
  TableColumnsType,
  TableProps,
  Tag,
} from "antd";
import { TQueryParam, TSemester } from "../../../types";
import {
  useAddFacultiesMutation,
  useGetAllCoursesQuery,
  useGetAllRegisteredSemestersQuery,
  useUpdateRegisteredSemesterMutation,
} from "../../../redux/features/admin/courseManagement.api";
import moment from "moment";
import PHForm from "../../../components/form/PHForm";
import PHSelect from "../../../components/form/PHSelect";
import { useGetAllFacultiesQuery } from "../../../redux/features/admin/userManagement.api";

export type TTableData = Pick<TSemester, "startDate" | "endDate" | "status">;

const items = [
  {
    label: "Upcoming",
    key: "UPCOMING",
  },
  {
    label: "Ongoing",
    key: "ONGOING",
  },
  {
    label: "Ended",
    key: "ENDED",
  },
];

const Courses = () => {
  const { data: courseData, isFetching } =
    useGetAllCoursesQuery(undefined);

    console.log(courseData);


  const tableData = courseData?.data?.map(
    ({ _id, title, code }) => ({
      key: _id,
      title,
      code

    })
  );

  const handleStatusUpdate = (data) => {
    const updateData = {
      id: semesterId,
      data: {
        status: data.key,
      },
    };
    updateSemesterStatus(updateData);
  };

  const menuProps = {
    items,
    onClick: handleStatusUpdate,
  };

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Code",
      dataIndex: "code",
      key: "code",
    },
  
    {
      title: "Action",
      key: "action",
      render: (item) => (
        <AddFacultyModal facultyInfo={item}/>
      ),
      width: 1,
    },
  ];

  // const onChange: TableProps<TTableData>["onChange"] = (
  //   _pagination,
  //   filters,
  //   _sorter,
  //   extra
  // ) => {
  //   if (extra.action === "filter") {
  //     const queryParams: TQueryParam[] = [];
  //     setParams(queryParams);
  //   }
  // };

  return (
    <Table columns={columns} dataSource={tableData} loading={isFetching} />
  );
};


const AddFacultyModal = ({facultyInfo}) =>{
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const {data: facultiesData} = useGetAllFacultiesQuery(undefined);
  const [addFaculties] = useAddFacultiesMutation();
  console.log(facultiesData);

  const facultiesOption = facultiesData?.data?.map((item) => ({
    label: item.fullName,
    value: item._id,
  }));

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = (data) => {
    const facultyData = {
      courseId: facultyInfo.key,
      data: {
        faculties: data.faculties
      },
    }

    console.log(facultyData);
    addFaculties(facultyData);
  };

  return (
    <>
          <Button onClick={showModal}>
        Add Faculty
      </Button>
      <Modal title="Basic Modal" open={isModalOpen} onCancel={handleCancel} footer={null}>
        <PHForm onSubmit={handleSubmit}>
          <PHSelect name="faculties" label="Faculty" options={facultiesOption} mode="multiple"/>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </PHForm>
      </Modal>
    </>
  )
}

export default Courses;
