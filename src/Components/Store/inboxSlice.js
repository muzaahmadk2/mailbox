import { createSlice } from "@reduxjs/toolkit";

const inboxSlice = createSlice({
  name: "inbox",
  initialState: { inboxArr: [], sentArr: [], noOfUnreadMessages: 0 },
  reducers: {
    addMails(state, action) {
      state.inboxArr = action.payload.inbox;
      state.noOfUnreadMessages = action.payload.no;
    },
    messageRead(state){
      state.noOfUnreadMessages -= 1;
    },
    addSentMails(state, action){
      state.sentArr = action.payload;
    }
  },
});
export default inboxSlice;
export const inboxAction = inboxSlice.actions;