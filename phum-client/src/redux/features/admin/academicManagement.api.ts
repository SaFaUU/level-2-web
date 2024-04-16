import { TQueryParam, TResponseRedux } from "../../../types";
import { TAcademicDepartment, TAcademicFaculty, TAcademicSemester } from "../../../types/academicManagement.type";
import { baseApi } from "../../api/baseApi";

const academicManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSemesters: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((arg: TQueryParam) => {
            params.append(arg.name, arg.value as string);
          });
        }

        return {
          url: "/academic-semesters",
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          params: params,
        };
      },
      transformResponse: (response: TResponseRedux<TAcademicSemester[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    getAllDepartments: builder.query({
      query: () => ({
        url: "/academic-departments",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }),
    }),
    addAcademicSemester: builder.mutation({
      query: (data) => ({
        url: "/academic-semesters/create-academic-semester",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      }),
    }),
    getAcademicFaculties: builder.query({
      query: () => {
        return { url: '/academic-faculties', method: 'GET' };
      },
      transformResponse: (response: TResponseRedux<TAcademicFaculty[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    getAcademicDepartments: builder.query({
      query: () => {
        return { url: '/academic-departments', method: 'GET' };
      },
      transformResponse: (response: TResponseRedux<TAcademicDepartment[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    addAcademicDepartment: builder.mutation({
      query: (data) => ({
        url: '/academic-departments/create-academic-department',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const {
  useGetAllSemestersQuery,
  useAddAcademicSemesterMutation,
  useGetAllDepartmentsQuery,
  useGetAcademicFacultiesQuery,
  useAddAcademicDepartmentMutation,
  useGetAcademicDepartmentsQuery
} = academicManagementApi;
