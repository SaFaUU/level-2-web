import { TQueryParam, TResponseRedux } from "../../../types";
import { TOfferedCourse } from "../../../types/studentCourse.type";
import { baseApi } from "../../api/baseApi";

const studentCourseApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllOfferedCourses: builder.query({
            query: (args) => {
              const params = new URLSearchParams();
      
              if (args) {
                args.forEach((arg: TQueryParam) => {
                  params.append(arg.name, arg.value as string);
                });
              }
      
              return {
                url: "/offered-courses/my-offered-courses",
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                },
                params: params,
              };
            },
            transformResponse: (response: TResponseRedux<TOfferedCourse[]>) => {
              return {
                data: response.data,
                meta: response.meta,
              };
            },
          })
})
})


export const { useGetAllOfferedCoursesQuery } = studentCourseApi