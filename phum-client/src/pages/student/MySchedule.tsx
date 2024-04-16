import React from 'react';
import { useGetAllEnrolledCourseQuery } from '../../redux/features/student/studentCourseManagement.api';

const MySchedule = () => {
    const {data} = useGetAllEnrolledCourseQuery(undefined);
    console.log(data);
    return (
        <div>
            {
                data?.data?.map((item, index) => (
                    <div key={index}>
                        <div>{item.course.title}</div>
                        <div>{item.offeredCourse.section}</div>
                        <div>{item.offeredCourse.days.map(item => <span> {item} </span>)}</div>
                    </div>
                ))
            }
        </div>
    );
};

export default MySchedule;