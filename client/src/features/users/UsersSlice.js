import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import BASE_URL from "../../utils/apiconfig";

export const loginUser = createAsyncThunk('/api/login' , async(userData , thunkAPI)=>{
   try{
    const res = await axios.post(`${BASE_URL}/api/auth/login`, userData );
    localStorage.setItem('token', res.data.token);
    return {token: res.data.token , user: res.data.user};

   }catch(error){
     return thunkAPI.rejectWithValue(error.response?.data?.message || 'login failed');    
   }
})

export const signupUser = createAsyncThunk('/api/signup', async (userData , thunkAPI)=>{
   try{
      const res = await axios.post(`${BASE_URL}/api/auth/signup`, userData );
      return  res.data;

   }catch(err){
      return thunkAPI.rejectWithValue(err.response?.data?.message || "signup failed");
   }
})

export const fetchProfile = createAsyncThunk('users/fetchProfile', async (_, thunkAPI) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      return thunkAPI.rejectWithValue('No token found');
    }

    const res = await axios.get(`${BASE_URL}/api/auth/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (err) {
    localStorage.removeItem('token'); // remove invalid token
    return thunkAPI.rejectWithValue(err.response?.data?.message || 'Fetching profile failed');
  }
});


const userSlice = createSlice(
   {
      name:'users', 
      initialState:{
         user:null,
         status :'idle',
         error: null,
         isAuthenticated:false,
      },
      reducers:{
         logout:(state)=>{
          state.user =null
          state.isAuthenticated = false
          localStorage.removeItem('token');
         }
      },
      extraReducers:(builder)=>{
         //login user
         builder 
         .addCase(loginUser.pending, (state)=>{
            state.status = 'loading', 
            state.error= null;
         })
         .addCase(loginUser.fulfilled ,  (state , action)=>{
            state.status = 'succeeded',
            state.user = action.payload.user, 
            state.token = action.payload.token, 
            state.isAuthenticated = true
         })
         .addCase(loginUser.rejected, (state , action)=>{
            state.status = 'failed', 
            state.error= action.payload;
         });
         //singup user
         builder
         .addCase(signupUser.pending , (state)=>{
            state.status = 'loading...'
            state.error = null;
      })
      .addCase(signupUser.fulfilled , (state, action)=>{
            state.status ='succeeded'
            state.user = action.payload.user;
            state.token= action.payload.token;
            state.isAuthenticated = true;
         
      })
      .addCase(signupUser.rejected , (state, action)=>{
            state.status = 'failed'
            state.error =action.payload ;
      })

      //profile fetch
        builder
         .addCase(fetchProfile.pending, (state)=>{
            state.status = 'loading', 
            state.error= null;
         })
         .addCase(fetchProfile.fulfilled ,  (state , action)=>{
            state.status = 'succeeded',
            state.user = action.payload.user,  
            state.isAuthenticated = true
         })
         .addCase(fetchProfile.rejected, (state , action)=>{
            state.status = 'failed', 
            state.error= action.payload;
            state.user = null;
            state.isAuthenticated = false;
         });
      },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;