import { baseApi } from "../../api/baseApi";

const userManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // getAllSemesters: builder.query({
    //   query: (args) => {
    //     const params = new URLSearchParams();

    //     if (args) {
    //       args.forEach((arg: TQueryParam) => {
    //         params.append(arg.name, arg.value as string);
    //       });
    //     }

    //     return {
    //       url: "/academic-semesters",
    //       method: "GET",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       params: params,
    //     };
    //   },
    //   transformResponse: (response: TResponseRedux<TAcademicSemester[]>) => {
    //     return {
    //       data: response.data,
    //       meta: response.meta,
    //     };
    //   },
    // }),
    addStudent: builder.mutation({
      query: (data) => ({
        url: "/user/create-student",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      }),
    }),
  }),
});

export const { useAddStudentMutation } = userManagementApi;
