import { createSlice } from '@reduxjs/toolkit'
import { fetchItemFromLocal } from '../../../utils/local-storage-utils'

const initialState = () => {
  const data = fetchItemFromLocal('auth')

  return data
    ? { user: data.user, token: data.token }
    : { user: null, token: '' }
}

export const authSlice = createSlice({
  name: 'auth',
  initialState: initialState(),
  reducers: {
    setAuth(state, action) {
      state.user = action.payload.user
      state.token = action.payload.token
    },
  },
})

export const selectAuth = (state) => state.auth

export const { setAuth } = authSlice.actions

export default authSlice.reducer
