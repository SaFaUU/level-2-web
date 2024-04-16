import { TQueryParam, TResponseRedux } from "../../../types";
import { baseApi } from "../../api/baseApi";

const facultyCourseApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllFacultyCourses: builder.query({
            query: (args) => {
              const params = new URLSearchParams();
      
              if (args) {
                args.forEach((arg: TQueryParam) => {
                  params.append(arg.name, arg.value as string);
                });
              }
      
              return {
                url: "/enrolled-courses",
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                },
                params: params,
              };
            },
            transformResponse: (response: TResponseRedux<any[]>) => {
              return {
                data: response.data,
                meta: response.meta,
              };
            },
            providesTags: ["offeredCourse"],
          }),
          addMark: builder.mutation({
            query: (data) => ({
              url: "/enrolled-courses/update-enrolled-course-marks",
              method: "PATCH",
              body: data,
            }),
            invalidatesTags: ["offeredCourse"],
          }),
})
})


export const { useGetAllFacultyCoursesQuery, useAddMarkMutation } = facultyCourseApi