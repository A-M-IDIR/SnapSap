import { createSlice } from "@reduxjs/toolkit";

export const AlertSlice = createSlice({
  name: "alertSlice",
  initialState: {
    value: null,
  },
  reducers: {
    setAlert: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setAlert } = AlertSlice.actions;

export default AlertSlice.reducer;
