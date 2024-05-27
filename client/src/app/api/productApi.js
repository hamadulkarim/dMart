import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const productApi = createApi({
  reducerPath: 'product',
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
    fetchProductCount: builder.query({
      query: () => '/products/product-count',
      transformResponse: (response, meta, arg) => {
        if (response.success) {
          return response.total
        }
      },
    }),
  }),
})

export const { useFetchProductCountQuery } = productApi
