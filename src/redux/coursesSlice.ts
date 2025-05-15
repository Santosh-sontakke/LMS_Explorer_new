import { Course } from './../types/index';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { saveToStorage } from '../utils/storage';


interface Itype {
  courses: Course[],
  loading: boolean,
  error: boolean | null,
}

const initialState: Itype = {
  courses: [],
  loading: false,
  error: null,
};

export const fetchCourses = createAsyncThunk('courses/fetch', async () => {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
    saveToStorage('cachedCourses', response.data);
    // console.log("RESPONSE>FSY", response.data)
    return response.data;
  } catch (error) {
    // const cached = getFromStorage'cachedCourses');
    // if (cached) return JSON.parse(cached);
    throw error;
  }
});

const courseSlice = createSlice({
  name: 'course',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.courses = action.payload;
      })
      .addCase(fetchCourses.rejected, (state) => {
        state.loading = false;
        state.error = 'Failed to fetch courses';
      });
  },
});

export default courseSlice.reducer;