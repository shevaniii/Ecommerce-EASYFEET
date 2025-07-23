// src/features/Products/CartSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import BASE_URL from '../../utils/apiConfig.js';

// ✅ Helper to get token safely
const getToken = () => localStorage.getItem('token');

// Fetch Cart
export const fetchCart = createAsyncThunk('cart/fetchCart', async (_, { rejectWithValue }) => {
  try {
    const token = getToken();
    if (!token) {
       return rejectWithValue('No authentication token found');
     }
     
    const res = await axios.get(`${BASE_URL}/api/auth/cart`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data?.items || [];
  } catch (err) {
    return rejectWithValue(err.response?.data?.msg || 'Failed to fetch cart');
  }
});

// Add to Cart
export const addToCart = createAsyncThunk('cart/addToCart', async ({ productId, quantity = 1 }, { dispatch, rejectWithValue }) => {
  try {
    const token = getToken();
     if (!token) {
       return rejectWithValue('No authentication token found');
     }
 
    const res = await axios.post(
      `${BASE_URL}/api/auth/cart/add`,
      { productId, quantity },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch(fetchCart()); // Refresh cart after adding
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.msg || 'Failed to add to cart');
  }
});

// Remove from Cart
export const removeFromCart = createAsyncThunk('cart/removeFromCart', async (productId, { dispatch, rejectWithValue }) => {
  try {
    const token = getToken();
      if (!token) {
       return rejectWithValue('No authentication token found');
     }
 
    await axios.delete(`${BASE_URL}/api/auth/cart/remove/${productId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(fetchCart()); // Refresh cart after removal
    return { productId };
  } catch (err) {
    return rejectWithValue(err.response?.data?.msg || 'Failed to remove item');
  }
});

// Update Cart Quantity
 export const updateCartQuantity = createAsyncThunk('cart/updateQuantity', async ({ productId, quantity }, { dispatch, rejectWithValue }) => {
   try {
     const token = getToken();
     if (!token) {
       return rejectWithValue('No authentication token found');
     }
 
     const res = await axios.put(
       `${BASE_URL}/api/auth/cart/update/${productId}`,
       { quantity },
       {
         headers: {
           Authorization: `Bearer ${token}`,
         },
       }
     );
     dispatch(fetchCart()); // Refresh cart after updating
     return res.data;
   } catch (err) {
     return rejectWithValue(err.response?.data?.msg || 'Failed to update cart');
   }
 });

  // Clear Cart
 export const clearCart = createAsyncThunk('cart/clearCart', async (_, { dispatch, rejectWithValue }) => {
   try {
     const token = getToken();
     if (!token) {
       return rejectWithValue('No authentication token found');
     }
 
     await axios.delete(`${BASE_URL}/api/auth/cart/clear`, {
       headers: {
         Authorization: `Bearer ${token}`,
       },
     });
     dispatch(fetchCart()); // Refresh cart after clearing
     return {};
   } catch (err) {
     return rejectWithValue(err.response?.data?.msg || 'Failed to clear cart');
   }
 });
const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    loading: false,
    error: null,
      totalItems: 0,
     totalPrice: 0,

  },
   reducers: {
     clearCartError: (state) => {
       state.error = null;
     },
   },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
          state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
         state.totalItems = action.payload.reduce((sum, item) => sum + item.quantity, 0);
         state.totalPrice = action.payload.reduce(
           (sum, item) => sum + (item.product?.price || 0) * item.quantity,
           0
         );
        state.error = null;
      })
      .addCase(fetchCart.rejected, (state, action) => {
         state.loading = false;
         state.error = action.payload;
       })
       // Add to Cart
       .addCase(addToCart.pending, (state) => {
         state.loading = true;
         state.error = null;
       })
       .addCase(addToCart.fulfilled, (state) => {
         state.loading = false;
         state.error = null;
       })
       .addCase(addToCart.rejected, (state, action) => {
         state.loading = false;
         state.error = action.payload;
       })
       // Update Cart Quantity
       .addCase(updateCartQuantity.pending, (state) => {
         state.loading = true;
         state.error = null;
       })
       .addCase(updateCartQuantity.fulfilled, (state) => {
         state.loading = false;
         state.error = null;
       })
       .addCase(updateCartQuantity.rejected, (state, action) => {
         state.loading = false;
         state.error = action.payload;
       }) 
       // Remove from Cart
       .addCase(removeFromCart.pending, (state) => {
         state.loading = true;
         state.error = null;
       })
       .addCase(removeFromCart.fulfilled, (state) => {
         state.loading = false;
         state.error = null;
       })
       .addCase(removeFromCart.rejected, (state, action) => {
         state.loading = false;
         state.error = action.payload;
       });
  },
});
 export const { clearCartError } = cartSlice.actions;
export default cartSlice.reducer;
