import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  keyword: '',
  results: [],
}

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setKeyword: (state, action) => {
      state.keyword = action.payload
    },
    setResults: (state, action) => {
      state.results = action.payload
    },
  },
})

export const selectValues = (state) => state.search

export const { setKeyword, setResults } = searchSlice.actions

export default searchSlice.reducer
