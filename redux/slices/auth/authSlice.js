import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';
import { REGISTER_URL, LOGIN_URL, LOGOUT_URL, GET_MYSELF_DATA_URL } from '../../../commons/constants'

import Cookies from 'js-cookie';


const initialState = {
  user: {},
  isAuthenticated: false,
  isRegisterSuccess: false,
  isLoading: false,
  isError: false,
  registerMsg: "",
  loginMsg: "",
  logoutMsg: "",
}
//
//
export const register = createAsyncThunk(
  'authentication/register',
  async (body, { rejectWithValue }) => {
    console.log(`register thunk req body: `, body);
    const res = await fetch(REGISTER_URL,
      {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body),
      }
    );
    console.log(`register res: `, res);
    if (res.status === 200) {
      console.log(`thunk login data: `, res.data);
      return res.data;
    }
    else {
      console.log(`thunk error: `, res);
      return res;
    }
  }
);
//
//  
export const login = createAsyncThunk(
  'authentication/login',
  async (body, { rejectWithValue }) => {
    console.log(`login thunk req body: `, body);
    const res = await axios.post(LOGIN_URL,
      body,
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      }
    );
    console.log(`login res: `, res);
    if (res.status === 200) {
      localStorage.setItem('access-token', res.data?.access)
      localStorage.setItem('refresh-token', res.data?.refresh)
      console.log(`thunk login data: `, res.data);
      return res.data;
    }
    else {
      console.log(`thunk error: `, res);
      return res;
    }
  }
);
//
//
export const logout = createAsyncThunk(
  'authentication/logout',
  async () => {
    console.log(`inside logout thunk`);
    const res = await axios.get(LOGOUT_URL,
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }
    );
    if (res.status === 200) {
      return res.data;
    }
    else {
      return res;
    }
  }
);
//
//
export const getMyselfData = createAsyncThunk(
  'authentication/getMyselfData',
  async () => {
  const res = await axios.get(GET_MYSELF_DATA_URL,
    {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('access-token')}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    }
  );
  console.log(`thunk getMyselfData res: `, res);
  if (res.status === 200) {
    console.log(`thunk getMyselfData data: `, res.data);
    return res.data;
  }
  else {
    console.log(`thunk getMyselfData error: `, res);
    return res;
  }
});
//
//
export const authSlice = createSlice({
  name: 'register-login-logout',
  initialState,
  extraReducers: (builder) => {
    // register cases
    builder.addCase(register.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(register.fulfilled, (state, action) => {
      state.isRegisterSuccess = true
      state.isLoading = false
      state.isError = false
      state.registerMsg = action.payload?.message
    })
    builder.addCase(register.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true
      state.registerMsg = action.error?.message
    })
    // login cases
    builder.addCase(login.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(login.fulfilled, (state, action) => {
      state.isAuthenticated = true
      state.user = action.payload?.user
      state.isLoading = false
      state.loginMsg = action.payload?.message
    })
    builder.addCase(login.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true
      state.loginMsg = action.error?.message
    })
    // get-myself-data cases
    builder.addCase(getMyselfData.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getMyselfData.fulfilled, (state, action) => {
      state.isAuthenticated = true
      state.user = action.payload
      state.isLoading = false
    })
    builder.addCase(getMyselfData.rejected, (state, action) => {
      state.isLoading = false
      state.isAuthenticated = false
      state.isError = true
    })
    // logout cases
    builder.addCase(logout.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(logout.fulfilled, (state, action) => {
      state.user = {}
      state.access_token = ""
      state.refresh_token = ""
      state.isAuthenticated = false
      state.isLoading = false
      state.isError = false
      state.logoutMsg = action.payload?.message
    })
    builder.addCase(logout.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true
      state.logoutMsg = action.error?.message
    })
  }
})
//
//
export default authSlice.reducer

