import React from "react";
import { useEnrollCourseMutation, useGetAllOfferedCoursesQuery } from "../../redux/features/student/studentCourseManagement.api";
import { Button, Col, Row } from "antd";
import { toast } from "sonner";


type TCourse = {
  [index: string]: any;
}

const OfferedCourse = () => {
  const {data: offeredCourseData} = useGetAllOfferedCoursesQuery(undefined);
  const [enroll] = useEnrollCourseMutation();

  const singleObject = offeredCourseData?.data?.reduce((acc:TCourse, item) =>{
    const key = item.course.title
    acc[key] = acc[key] || {courseTitle: key, sections: []}
    acc[key].sections.push({
      section: item.section,
      _id: item._id,
      startTime: item.startTime,
      endTime: item.endTime,
      days: item.days
    })
    return acc;
  }, {})

 const modifiedData =  Object.values(singleObject ? singleObject : {});

 const handleEnroll = async (id: string) => {
  const data = {
    offeredCourse: id
  }
  const res = await enroll(data);
  console.log(res);
  if(res.data.success){
    toast.success(res.data.message);
  }
 };

 if(modifiedData.length === 0){
  return (
    <Row justify="center" align="middle" style={{ height: "100vh" }}>
      <h1>No courses found</h1>
    </Row>
  )
 }



  return (
    <Row gutter={[10, 20]}>
      {
        modifiedData.map(item =>{
          return (
            <Col span={24} style={{border: "solid #d4d4d4 2px", }} key={item.courseTitle}>
              <div style={{padding: "10px"}}>
              <h2>
              {item.courseTitle}
              </h2>
              </div>
              <div>
                {
                  item.sections.map((section, index) =>{
                    return (
                      <Row key={index} justify={"space-between"} align={"middle"} style={{marginBottom: "10px", border: "solid #d4d4d4 2px", padding: "10px"}}>
                        <Col span={5}>Section: {section.section}</Col>
                        <Col span={5}>Start Time: {section.startTime}</Col>
                        <Col span={5}>End Time: {section.endTime}</Col>
                        <Col span={5}>Days: {section.days.map((day, index) => <span key={index}> {day} </span>) }</Col>

                        <Button onClick={() => handleEnroll(section._id)}>Enroll</Button>
                      </Row>
                    )
                  })
                }
              </div>
            </Col>
          )
        })
      }
    </Row>
  );
};

export default OfferedCourse;
