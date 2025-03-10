import {configureStore} from "@reduxjs/toolkit";
import postSlice from "./postSlice";
import userSlice from "./userSlice";

export const store = configureStore({
      reducer:{
           post:postSlice,
           user:userSlice
      }
})