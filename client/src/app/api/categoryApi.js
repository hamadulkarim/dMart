import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const categoryApi = createApi({
  reducerPath: 'category',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_DMART_API_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token

      if (token) {
        headers['Authorization'] = token
      }

      return headers
    },
  }),
  endpoints: (builder) => ({
    fetchCategories: builder.query({
      query: () => '/categories',
      transformResponse: (response, meta, arg) => {
        if (response.success) {
          return response.categories
        }
      },
    }),
  }),
})

export const { useFetchCategoriesQuery } = categoryApi
