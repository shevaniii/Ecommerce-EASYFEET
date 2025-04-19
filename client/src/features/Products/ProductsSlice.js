import { createSlice ,  createAsyncThunk} from "@reduxjs/toolkit";
import axios from 'axios'


 export const fetchProducts = createAsyncThunk('products/fetch' ,async ()=>{
  const res = await axios.get('api/products')
  return res.data
 })
const ProductSlice = createSlice({
    name:'products',
    initialState:{
        products: [],
        status: 'idle'
    },
    reducers:{}, 
    extraReducers: (builder)=>{
      builder.addCase(fetchProducts.pending , (state)=>{
        console.log("⏳ fetchProducts.pending");
        state.status= 'loading'
      });
      builder.addCase(fetchProducts.rejected , (state , action )=>{
        console.log("X fetchProducts.rejected", action.error);
        state.status = 'failed'
      });
      builder.addCase (fetchProducts.fulfilled , (state , action)=>{
        console.log("✅ Products fetched and stored in Redux:", action.payload); 
        state.products = action.payload
        state.status = 'succeeded'
      });
    }
});

export default ProductSlice.reducer
