import { createSlice } from "@reduxjs/toolkit";

export const GroupSlice = createSlice({
  name: "groupSlice",
  initialState: {
    value: [],
  },
  reducers: {
    addGroup: (state, action) => {
      state.value.push(action.payload);
    },
    setGroups: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { addGroup, setGroups } = GroupSlice.actions;

export default GroupSlice.reducer;
