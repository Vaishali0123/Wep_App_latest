// store/api/settingsApi.ts
import { API } from "@/app/utils/helpers";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const settingsApi = createApi({
  reducerPath: "settingsApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${API}` }),
  endpoints: (builder) => ({
    fetchSettings: builder.query({
      query: (userId) => `/settings/${userId}`,
    }),
  }),
});

export const { useFetchSettingsQuery } = settingsApi;
