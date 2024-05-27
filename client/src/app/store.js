import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/auth/authSlice'
import cartReducer from './slices/cart/cartSlice'
import searchReducer from './slices/search/searchSlice'
import { categoryApi } from './api/categoryApi'
import { productApi } from './api/productApi'

const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    search: searchReducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      categoryApi.middleware,
      productApi.middleware
    ),
})

export default store
