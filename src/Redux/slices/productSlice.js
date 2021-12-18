import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import toast from 'react-hot-toast'
// import allContext from '../../hooks/useFirebase'
// const initialState = {
//   value: 0,
// }
export const fetchProducts = createAsyncThunk(
  'product/fetchproducts',
  async () => {
    const response = await fetch('http://localhost:5000/products')
    const result = await response.json()
    // console.log(result)
    return result
  }
)
export const fetchSearch = createAsyncThunk(
  'product/fetchSearch',
  async (search) => {
    const response = await fetch(`http://localhost:5000/products/search?val=${search}`)
    const result = await response.json()
    // console.log(result)
    return result
  }
)
export const fetchSingleProducts = createAsyncThunk(
  'product/fetchSingleproducts',
  async (id) => {
    // console.log(id)
    const response = await fetch(`http://localhost:5000/products/${id}`)
    const result = await response.json()
    // console.log(result)
    return result
  }
)

export const productSlice = createSlice({
  name: 'product',
  initialState:{
      discover:[],
      singleProduct:[],
      users:[],
      search:[]
  },
  reducers: {
    increment: (state) => {
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    // incrementByAmount: (state, action) => {
    //   state.value += action.payload
    // },
  },

  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      // Add user to the state array
      state.discover=action.payload
    });
    builder.addCase(fetchSingleProducts.fulfilled, (state, action) => {
      // Add user to the state array
      // console.log(action.payload)
      state.singleProduct=action.payload
    })
    builder.addCase(fetchSearch.fulfilled, (state, action) => {
      // Add user to the state array
      console.log(action.payload)
      state.search=action.payload
    })
  },
  // extraReducers: (builder) => {
  //   // Add reducers for additional action types here, and handle loading state as needed
  //   builder.addCase(fetchSingleProducts.fulfilled, (state, action) => {
  //     // Add user to the state array
  //     console.log(action.payload)
  //     state.singleProduct=action.payload
  //   })
  // }

})

// Action creators are generated for each case reducer function
export const { increment, decrement } = productSlice.actions

export default productSlice.reducer