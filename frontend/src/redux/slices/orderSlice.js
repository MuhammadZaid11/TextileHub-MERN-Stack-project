import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

const initialState = {
  orders: [],
  order: null,
  isLoading: false,
  isSuccess: false,
  error: null,
};

export const createOrder = createAsyncThunk(
  'order/create',
  async (order, thunkAPI) => {
    try {
      const { data } = await api.post('/orders', order);
      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const getOrderDetails = createAsyncThunk(
  'order/getDetails',
  async (id, thunkAPI) => {
    try {
      const { data } = await api.get(`/orders/${id}`);
      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const getMyOrders = createAsyncThunk(
  'order/myOrders',
  async (_, thunkAPI) => {
    try {
      const { data } = await api.get('/orders/myorders');
      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const payOrder = createAsyncThunk(
  'order/pay',
  async ({ orderId, paymentResult }, thunkAPI) => {
    try {
      const { data } = await api.put(`/orders/${orderId}/pay`, paymentResult);
      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    resetOrderCreate: (state) => {
      state.isSuccess = false;
      state.order = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.order = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getOrderDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrderDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.order = action.payload;
      })
      .addCase(getOrderDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getMyOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMyOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload;
      })
      .addCase(getMyOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(payOrder.fulfilled, (state, action) => {
        state.order = action.payload;
      });
  },
});

export const { resetOrderCreate } = orderSlice.actions;
export default orderSlice.reducer;
