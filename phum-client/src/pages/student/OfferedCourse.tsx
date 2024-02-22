import React from "react";
import { useGetAllOfferedCoursesQuery } from "../../redux/features/student/studentCourseManagement.api";
import { Button, Col, Row } from "antd";

const OfferedCourse = () => {
  const {data: offeredCourseData} = useGetAllOfferedCoursesQuery(undefined);
  console.log(offeredCourseData);

  const singleObject = offeredCourseData?.data?.reduce((acc, item) =>{
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

  console.log(singleObject);
 const modifiedData =  Object.values(singleObject ? singleObject : {});
  return (
    <Row gutter={[10, 20]}>
      {
        modifiedData.map(item =>{
          return (
            <Col span={24} style={{border: "solid #d4d4d4 2px", }}>
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

                        <Button>Enroll</Button>
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
