// src/features/Products/CartSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// ✅ Helper to get token safely
const getToken = () => localStorage.getItem('token');

// Fetch Cart
export const fetchCart = createAsyncThunk('cart/fetchCart', async (_, { rejectWithValue }) => {
  try {
    const token = getToken();
    const res = await axios.get('/api/auth/cart', {
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
export const addToCart = createAsyncThunk('cart/addToCart', async ({ productId, quantity }, { dispatch, rejectWithValue }) => {
  try {
    const token = getToken();
    const res = await axios.post(
      '/api/auth/cart/add',
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
    await axios.delete(`/api/auth/cart/remove/${productId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(fetchCart()); // Refresh cart after removal
  } catch (err) {
    return rejectWithValue(err.response?.data?.msg || 'Failed to remove item');
  }
});

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.error = null;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default cartSlice.reducer;
