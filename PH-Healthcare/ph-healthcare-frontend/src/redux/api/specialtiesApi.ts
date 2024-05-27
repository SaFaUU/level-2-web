import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const specialtiesApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createSpecialty: build.mutation({
      query: (data) => ({
        url: "/specialties",
        method: "POST",
        contentType: "multipart/form-data",
        data: data,
      }),
      invalidatesTags: [tagTypes.specialties],
    }),
    getAllSpecialtys: build.query({
      query: () => ({
        url: "/specialties",
        method: "GET",
        contentType: "application/json",
      }),
      providesTags: [tagTypes.specialties],
    }),
    deleteSpecialty: build.mutation({
      query: (id) => ({
        url: `/specialties/${id}`,
        method: "DELETE",
        contentType: "application/json",
      }),
      invalidatesTags: [tagTypes.specialties],
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreateSpecialtyMutation,
  useGetAllSpecialtysQuery,
  useDeleteSpecialtyMutation,
} = specialtiesApi;
