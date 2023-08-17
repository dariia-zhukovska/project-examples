import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IUserProfile } from "../../interfaces/index";
import { API_URL } from "../../constants/api";

export const profileApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  tagTypes: ["Users"],
  endpoints: (builder) => ({
    getAllProfilesData: builder.query<any, string>({
      query: () => `/profiles`,
      providesTags: ["Users"],
    }),
    getUserData: builder.query<IUserProfile, string | undefined>({
      query: (profileId) => `/profiles/${profileId}`,
      providesTags: ["Users"],
    }),
    updateUser: builder.mutation<
      void,
      { profileId?: string; updatedData?: IUserProfile }
    >({
      query: ({ profileId, updatedData }) => ({
        url: `/profiles/${profileId}`,
        method: "PUT",
        body: updatedData,
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});

export const {
  useGetAllProfilesDataQuery,
  useGetUserDataQuery,
  useUpdateUserMutation,
} = profileApi;
