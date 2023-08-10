import { createSlice } from "@reduxjs/toolkit";

const inboxSlice = createSlice({
  name: "inbox",
  initialState: { inboxArr: [] },
  reducers: {
    addMails(state, action) {
      state.inboxArr = action.payload;
    },
  },
});
export default inboxSlice;
export const inboxAction = inboxSlice.actions;