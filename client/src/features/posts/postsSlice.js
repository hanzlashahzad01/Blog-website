import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Helper function to get auth token
const getAuthToken = () => {
  return localStorage.getItem('token');
};

// Helper function to create axios instance with auth header
const getAuthHeaders = () => {
  const token = getAuthToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const fetchPosts = createAsyncThunk('posts/fetchAll', async (_, { rejectWithValue }) => {
  try {
    const token = getAuthToken();
    if (!token) {
      return rejectWithValue('Authentication required');
    }
    const response = await axios.get(`${API_BASE}/posts`, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.error || 'Failed to fetch posts');
  }
});

export const fetchPostById = createAsyncThunk('posts/fetchById', async (id, { rejectWithValue }) => {
  try {
    const token = getAuthToken();
    if (!token) {
      return rejectWithValue('Authentication required');
    }
    const response = await axios.get(`${API_BASE}/posts/${id}`, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.error || 'Failed to fetch post');
  }
});

export const createPost = createAsyncThunk('posts/create', async (data, { rejectWithValue }) => {
  try {
    const token = getAuthToken();
    if (!token) {
      return rejectWithValue('Authentication required');
    }
    const response = await axios.post(`${API_BASE}/posts`, data, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.error || 'Failed to create post');
  }
});

export const updatePost = createAsyncThunk('posts/update', async ({ id, data }, { rejectWithValue }) => {
  try {
    const token = getAuthToken();
    if (!token) {
      return rejectWithValue('Authentication required');
    }
    const response = await axios.put(`${API_BASE}/posts/${id}`, data, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.error || 'Failed to update post');
  }
});

export const deletePost = createAsyncThunk('posts/delete', async (id, { rejectWithValue }) => {
  try {
    const token = getAuthToken();
    if (!token) {
      return rejectWithValue('Authentication required');
    }
    await axios.delete(`${API_BASE}/posts/${id}`, {
      headers: getAuthHeaders(),
    });
    return id;
  } catch (error) {
    return rejectWithValue(error.response?.data?.error || 'Failed to delete post');
  }
});

const initialState = {
  items: [],
  selected: null,
  status: 'idle',
  error: null,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      })
      .addCase(fetchPostById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPostById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.selected = action.payload;
      })
      .addCase(fetchPostById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      })
      .addCase(createPost.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
        state.selected = action.payload;
        state.status = 'succeeded';
      })
      .addCase(createPost.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      })
      .addCase(updatePost.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.items = state.items.map((item) =>
          item._id === action.payload._id ? action.payload : item
        );
        state.selected = action.payload;
        state.status = 'succeeded';
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      })
      .addCase(deletePost.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item._id !== action.payload);
        state.status = 'succeeded';
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      });
  },
});

export default postsSlice.reducer;

