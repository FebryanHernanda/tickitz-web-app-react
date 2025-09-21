import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../utils/constants";

const initialState = {
  orderData: null,
  orderHistory: null,
  loading: false,
  error: null,
};

export const createOrder = createAsyncThunk(
  "orders/postdata",
  async (orderData, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;

      const response = await axios.post(`${API_URL}/orders/`, orderData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      rejectWithValue(error.response?.data?.error || "Insert data gagal");
    }
  },
);

export const getOrderHistory = createAsyncThunk(
  "orders/order/history",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;

      const response = await axios.get(`${API_URL}/orders/history`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      rejectWithValue(error.response?.data?.error || "Gagal mengambil data");
    }
  },
);

const orderSlice = createSlice({
  initialState,
  name: "orders",
  reducers: {
    resetDataOrders: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      /* =========================================== Create Order Data =========================================== */
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orderData = action.payload.order;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      /* =========================================== Get Order Data =========================================== */
      .addCase(getOrderHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrderHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.orderHistory = action.payload.data;
      })
      .addCase(getOrderHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetDataOrders } = orderSlice.actions;
export default orderSlice.reducer;
