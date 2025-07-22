import { createAsyncThunk , createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import BASE_URL from "../../utils/apiConfig.js";

export const placeOrder = createAsyncThunk('order/placeOrder' , 
    async ({buyNow = false, productId = null, quantity = 1, address, phone } = {}, {rejectWithValue}) => {
        try{
            const token = localStorage.getItem('token');
            if (!token) {
                return rejectWithValue('No authentication token found');
            }

            const orderData = buyNow 
                ? { buyNow, productId, quantity, address, phone }
                : { address, phone };

            const res = await axios.post(`${BASE_URL}/api/auth/order/create`, orderData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            
            return res.data.order; // Return the actual order object
        } catch(err) {
            return rejectWithValue(err.response?.data?.msg || 'Failed to place order');
        }
    }
);

export const fetchOrders = createAsyncThunk('orders/fetchOrders', async(_, {rejectWithValue}) => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            return rejectWithValue('No authentication token found');
        }

        const res = await axios.get(`${BASE_URL}/api/auth/order`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        
        return res.data.orders || res.data; // Handle both response formats
    } catch(err) {
        return rejectWithValue(err.response?.data?.msg || "Failed to fetch orders");
    }
});

export const getOrderById = createAsyncThunk('orders/getOrderById', async(orderId, {rejectWithValue}) => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            return rejectWithValue('No authentication token found');
        }

        const res = await axios.get(`${BASE_URL}/api/auth/order/${orderId}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        
        return res.data.order;
    } catch(err) {
        return rejectWithValue(err.response?.data?.msg || "Failed to fetch order details");
    }
});

const orderSlice = createSlice({
    name: 'orders',
    initialState: {
        order: null,
        orders: [],
        currentOrder: null,
        loading: false,
        error: null
    },
    reducers: {
        clearOrderError: (state) => {
            state.error = null;
        },
        clearCurrentOrder: (state) => {
            state.currentOrder = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Place Order
            .addCase(placeOrder.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(placeOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.order = action.payload;
                state.error = null;
                // Add to orders array if it doesn't exist
                if (!state.orders.find(order => order._id === action.payload._id)) {
                    state.orders.unshift(action.payload);
                }
            })
            .addCase(placeOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Fetch Orders
            .addCase(fetchOrders.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = action.payload;
                state.error = null;
            })
            .addCase(fetchOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Get Order By ID
            .addCase(getOrderById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getOrderById.fulfilled, (state, action) => {
                state.loading = false;
                state.currentOrder = action.payload;
                state.error = null;
            })
            .addCase(getOrderById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { clearOrderError, clearCurrentOrder } = orderSlice.actions;
export default orderSlice.reducer;