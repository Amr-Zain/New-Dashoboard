import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import dayjs from 'dayjs';
import 'dayjs/locale/ar';
import toast from 'react-hot-toast';

import { showDynamicSwal } from '@/utils/helpers';
import Alert from "@/assets/images/alert.svg";
import axiosInstance from '@/services/instance';

dayjs.locale('ar');
// Define authentication state interface
interface AuthState {
  user: any;
  id: string | null;
  token: any;
  full_name: string | null;
  email: string | null;
  avatar: string | null;
  phone: string | null;
  phone_code: string | null;
  locale: string | null;
  isLoading: boolean;
  image: any | null;

}

const initialState: AuthState = {
  id: null,
  user: {},
  token: Cookies.get("user_token") || null,
  full_name: null,
  email: null,
  avatar: null,
  phone: "",
  phone_code: "",
  locale: null,
  isLoading: false,
  image: null,
};




const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setAuthedUserData: (state, action: PayloadAction<Partial<AuthState>>) => {
      const { token, ...userData } = action.payload;
      state.user = userData;
      Object.assign(state, action.payload);
      Cookies.set('user_token', token , { expires: 30 });
      Cookies.set('user_data', JSON.stringify(action.payload), { expires: 30 });
    },
    deleteAuthedUserData: (state) => {
      Object.assign(state, initialState);
      Cookies.remove('user_token');
      Cookies.remove('user_data');
    },
    resetState: (state) => {
      Object.assign(state, initialState);
    },
  },
  extraReducers: (builder) => {
    // builder
    //   .addCase(logout.pending, (state) => {
    //     state.isLoading = false;
    //   })
    //   .addCase(logout.fulfilled, (state) => {
    //     state.isLoading = false;
    //   })
    //   .addCase(logout.rejected, (state) => {
    //     state.isLoading = false;
    //   });
  },
});

export const { setAuthedUserData, deleteAuthedUserData, resetState } = profileSlice.actions;
export default profileSlice.reducer;
