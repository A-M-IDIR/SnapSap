import { createSlice } from "@reduxjs/toolkit";

export const LogSlice = createSlice({
  name: "logSlice",
  initialState: {
    value: null,
  },
  reducers: {
    setLogs: (state, action) => {
      state.value = action.payload;
    },
    addLog: (state, action) => {
      state.value.push(action.payload);
    },
  },
});

export const { setLogs, addLog } = LogSlice.actions;

export default LogSlice.reducer;
