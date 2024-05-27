import { createSlice } from '@reduxjs/toolkit'
import {
  fetchItemFromLocal,
  setItemInLocal,
} from '../../../utils/local-storage-utils'

const initialState = () => {
  const data = fetchItemFromLocal('cart')
  return data ? { items: data } : { items: [] }
}

const cartSlice = createSlice({
  name: 'cart',
  initialState: initialState(),
  reducers: {
    setCart: (state, action) => {
      state.items = action.payload
    },

    removeCartItem: (state, action) => {
      try {
        const index = state.items.findIndex(
          (item) => item._id === action.payload
        )

        if (index !== -1) {
          state.items.splice(index, 1)
          setItemInLocal('cart', state.items)
        }
      } catch (error) {
        console.log(error)
      }
    },
  },
})

// Function to calculate total price
export const selectTotalPrice = (state) => {
  try {
    return state.cart.items.reduce((sum, item) => {
      return sum + item.price
    }, 0)
  } catch (error) {
    console.log(error)
    return 0
  }
}

export const selectCartItems = (state) => state.cart.items

export const { removeCartItem, setCart } = cartSlice.actions

export default cartSlice.reducer
