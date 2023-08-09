import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";


const Store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
});

export default Store;
