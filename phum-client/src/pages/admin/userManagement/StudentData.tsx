import React from "react";
import {
  Button,
  Pagination,
  Space,
  Table,
  TableColumnsType,
  TableProps,
} from "antd";
import { TQueryParam, TStudent } from "../../../types";
import { useGetAllStudentsQuery } from "../../../redux/features/admin/userManagement.api";
import { Link } from "react-router-dom";

export type TTableData = Pick<TStudent, "name" | "id" | "email" | "contactNo">;

const StudentData = () => {
  const [params, setParams] = React.useState<TQueryParam[]>([]);
  const [page, setPage] = React.useState(1);
  const {
    data: studentData,
    isLoading,
    isFetching,
  } = useGetAllStudentsQuery([
    { name: "limit", value: "10" },
    { name: "page", value: page },
    { name: "sort", value: "id" },
    ...params,
  ]);
  console.log(studentData);
  const metaData = studentData?.meta;

  const tableData = studentData?.data?.map(
    ({ _id, fullName, id, email, contactNo }) => ({
      key: _id,
      fullName,
      id,
      email,
      contactNo,
    })
  );

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Name",
      dataIndex: "fullName",
      key: "name",
    },
    {
      title: "Roll No",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Contact No",
      dataIndex: "contactNo",
      key: "contactNo",
    },
    {
      title: "Action",
      key: "action",
      render: (item) => (
        <Space>
          <Link to={`/admin/student-data/${item.key}`}>
            <Button>Details</Button>
          </Link>
          <Button>Update</Button>
          <Button>Block</Button>
        </Space>
      ),
      width: "1%",
    },
  ];

  const onChange: TableProps<TTableData>["onChange"] = (
    _pagination,
    filters,
    _sorter,
    extra
  ) => {
    if (extra.action === "filter") {
      const queryParams: TQueryParam[] = [];
      filters.name?.forEach((item) =>
        queryParams.push({
          name: "name",
          value: item,
        })
      );

      filters.year?.forEach((item) =>
        queryParams.push({
          name: "year",
          value: item,
        })
      );

      setParams(queryParams);
      console.log(queryParams);
    }
  };

  return (
    <>
      <Table
        columns={columns}
        dataSource={tableData}
        onChange={onChange}
        loading={isFetching}
        pagination={false}
      />
      <Pagination
        current={page}
        pageSize={metaData?.limit}
        total={metaData?.total}
        onChange={(value) => setPage(value)}
      />
    </>
  );
};

export default StudentData;
