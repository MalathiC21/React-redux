import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUserData = createAsyncThunk("users/fetchData", async()=>{
    const response = await axios.get("https://jsonplaceholder.typicode.com/users");
    return response.data;
})
const userSlice = createSlice({
    name:"users",
    initialState:{
        users:[],
        status:"idle"
    },
    reducers:{
       addUser(state,action){
        state.users.push(action.payload);
       }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchUserData.pending, (state,action)=>{
            state.status = "loading";
        })
        .addCase(fetchUserData.fulfilled, (state,action)=>{
            state.status = "succeed";
            state.users = action.payload;
        })
        .addCase(fetchUserData.rejected , (state,action)=>{
            state.status = "failed";
        })
    }
})

export const {addUser} = userSlice.actions;
export const getAllUsers = (state) => state.user.users;
export const getUserStatus = (state) => state.user.status;
export default userSlice.reducer;