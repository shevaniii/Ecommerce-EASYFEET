import { createAsyncThunk , createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import BASE_URL from "../../utils/apiConfig.js" ;


export const placeOrder = createAsyncThunk('order/placeOrder' , 
    async ({buyNow = false  ,productId= null , quantity=1 , address , phone }={}, {rejectWithValue})=>{
        try{
            const token = localStorage.getItem('token');
             const res = await axios.post(`${BASE_URL}/api/auth/order/create` , buyNow?{buyNow , productId , quantity , address , phone}:{address , phone} , 
                {headers: {Authorization :`Bearer ${token}`}}
              );
            return res.data.orders;
        }catch(err){
            return rejectWithValue(err.response?.data?.msg || 'Failed to place order');
        }
    }
);
export const fetchOrders = createAsyncThunk('orders/fetchOrders', async(_ , {rejectWithValue})=>{
try{const token = localStorage.getItem('token');
     const res = await axios.get(`${BASE_URL}/api/auth/order`, {
        headers: {Authorization: `Bearer ${token}`}
     });
     return res.data;
}catch(err){
    return rejectWithValue(err.response?.data?.msg || "Failed to fetch orders");
}
}) 

const orderSlice = createSlice({
    name : 'orders',
    initialState: {
        order: null , 
        orders: [],
        loading : false,
        error: null
    },
    reducers:{},
    extraReducers: (builder) => {
    builder
      .addCase(placeOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
        
      });
  },
});

export default orderSlice.reducer;