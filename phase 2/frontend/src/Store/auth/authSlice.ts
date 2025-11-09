import {  createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import{fetchRequesPost} from "../../common/NetworkOps";


export const  loginUser = createAsyncThunk('auth/loginUser', async (credentials: { email: string; password: string }) => {
try
    {  const response = await fetchRequesPost('/auth/login', JSON.stringify(credentials));
  return response;}
  catch(error){
    throw error;
  }
});

export const  signupUser = createAsyncThunk('auth/signupUser', async (data: { name: string; password: string; email: string }) => {
try
    {  const response:any = await fetchRequesPost('/auth/signup', JSON.stringify(data));
        
  return response.user;}
  catch(error){
    throw error;
  }
});

const initialState = {
  isAuthenticated: sessionStorage.getItem("accessToken") ? true : false,
  user: sessionStorage.getItem("user") ? JSON.parse(sessionStorage.getItem("user") || '') :{},
  success: false,
  loading: false,
  error: null,
};
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        loginSuccess: (state, action) => {
            state.isAuthenticated = true;
            state.user = action.payload;
            state.success = true;
            state.loading = false;
            state.error = null;
        },
        loginFailure: (state, action) => {
            state.isAuthenticated = false;
            state.user = [];
            state.success = false;
            state.loading = false;
            state.error = action.payload;
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.user = [];
            state.success = false;
            state.loading = false;
            state.error = null;
            sessionStorage.removeItem("accessToken");
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loginUser.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.success = false;
        });
        builder.addCase(loginUser.fulfilled, (state, action:any) => {
                        console.log(action.payload);
            sessionStorage.setItem("user",JSON.stringify(action.payload.user));
            state.isAuthenticated = true;
            sessionStorage.setItem("accessToken", action.payload.accessToken);
            state.user = action.payload.user;
            state.success = true;
            state.loading = false;
            state.error = null;
        });
        builder.addCase(loginUser.rejected, (state:any, action:any) => {
            state.isAuthenticated = false;
            state.user = null;
            state.success = false;
            state.loading = false;
            state.error = action.payload.message;
        });
        builder.addCase(signupUser.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.success = false;
        });
        builder.addCase(signupUser.fulfilled, (state, action) => {
            console.log(action.payload);
            
            state.isAuthenticated = true;
            sessionStorage.setItem("accessToken", action.payload.accessToken);
            state.user = action.payload;
            state.success = true;
            state.loading = false;
            state.error = null;
        });
        builder.addCase(signupUser.rejected,(state:any,action:any)=>{
            state.isAuthenticated = false;
            state.user = null;
            state.success = false;
            state.loading = false;
            state.error = action.payload.message;
        })
    }
})

export const { loginSuccess, loginFailure, logout } = authSlice.actions;

export default authSlice.reducer;