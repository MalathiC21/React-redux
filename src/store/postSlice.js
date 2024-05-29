import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPosts = createAsyncThunk('posts/fetchData', async()=>{
    const response = await axios.get("https://jsonplaceholder.typicode.com/posts");
    return response.data;
})

export const addNewPost = createAsyncThunk("posts/newpost", async (initialState)=>{
    const response = await axios.post("https://jsonplaceholder.typicode.com/posts" , initialState);
    return response.data;
})

const postSlice = createSlice({
    name:"posts",
    initialState:{
        posts:[],
        status:"idle" 
    },
    reducers:{
        addPost(state,action){
              state.posts.push(action.payload);
        },
        removePost(state,action){
            let updatePost = state.posts.filter(item => item.id !== action.payload);
            state.posts = updatePost;
        },
        
        incrementLike(state, action) {
            
            const onLikePost = state.posts.find(item => item.id === action.payload);
            if (onLikePost) {
                onLikePost.likeCount = (onLikePost.likeCount  || 0 )+ 1;
            }
            
            // onLikePost.like = onLikePost ? onLikePost.like + 1 : 0;
        },

        incrementDislike(state, action) {
            const onDislikePost = state.posts.find(item => item.id === action.payload);
            if (onDislikePost) {
                onDislikePost.dislikeCount = (onDislikePost.dislikeCount || 0) + 1;
            }
        }
    },
    extraReducers(builder){
        builder 
        .addCase(fetchPosts.pending, (state,action) => {
            state.status = "loading";
        })
        .addCase(fetchPosts.fulfilled, (state,action) => {
            state.status = "succeed";
            state.posts = action.payload;
        })
        .addCase(fetchPosts.rejected, (state,action) => {
            state.status = "failed";
        })
        .addCase(addNewPost.fulfilled, (state,action) => {
            state.posts.push(action.payload);
        })
    }
})

export const {addPost, removePost, incrementLike, incrementDislike} = postSlice.actions;
export const getAllPosts = (state)=> state.post.posts;
export const getStatus = (state) => state.post.status;
export default postSlice.reducer;