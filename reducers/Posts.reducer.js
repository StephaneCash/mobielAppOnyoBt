import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../bases/basesUrl";
import { Alert } from "react-native"

export const getAllPosts = createAsyncThunk("posts/getData", async (arg, {
    rejectWithValue
}) => {
    try {
        const { data } = await axios.get(`${baseUrl}/posts`);
        return data
    } catch (error) {
        rejectWithValue(error.response);
        console.log(error.response)
    }
});

export const createPost = createAsyncThunk("posts/add", async (arg, {
    rejectWithValue
}) => {

    try {
        const response = await axios.post(`${baseUrl}/posts`, arg.data, arg.config);
        if (response.status === 201) {
            Alert.alert('Publication effectuée avec succès')
        }
        return response.data
    } catch (error) {
        rejectWithValue(error.response);
        console.log(error, " ERREUR")
    }
});

export const commentPost = createAsyncThunk("posts/comment", async (arg, {
    rejectWithValue
}) => {

    try {
        const response = await axios.patch(`${baseUrl}/posts/comment/${arg.idPost}`, arg.form);
        return response.data
    } catch (error) {
        rejectWithValue(error.response);
        console.log(error, " ERREUR")
    }
});

export const likePostHanlde = createAsyncThunk("posts/like", async (arg, {
    rejectWithValue
}) => {

    try {
        const response = await axios.patch(`${baseUrl}/posts/like/${arg.idPost}`, { id: arg.id });
        return response.data
    } catch (error) {
        rejectWithValue(error.response);
        console.log(error, " ERREUR")
    }
});


export const postSlice = createSlice({
    name: "posts",
    initialState: {
        value: [],
        isSuccess: false,
        loading: false
    },
    extraReducers: {
        //Get all posts
        [getAllPosts.pending]: (state, { payload }) => {
            state.loading = true;
            state.isSuccess = false;
        },
        [getAllPosts.fulfilled]: (state, action) => {
            state.loading = false;
            state.value = action.payload;
            state.isSuccess = true;
        },
        [getAllPosts.rejected]: (state, { payload }) => {
            state.loading = false;
            state.isSuccess = false;
        },
        //Create Post
        [createPost.pending]: (state, action) => {
            state.loading = true;
        },
        [createPost.fulfilled]: (state, action) => {
            state.loading = false;
            state.value.push(action.payload)
            state.isSuccess = true;
        },
        [createPost.rejected]: (state, action) => {
            state.loading = false;
            state.isSuccess = false;
        },
        //Like Post
        [likePostHanlde.pending]: (state, action) => {
            state.loading = true;
        },
        [likePostHanlde.fulfilled]: (state, action) => {
            state.loading = false;
            state.isSuccess = true;
            let stateVal = state.value.filter(val => {
                return val._id === action.payload._id;
            })
            stateVal.map(val => {
                if (val._id !== action.payload._id) {
                    return val.likers.push(action.payload._id)
                }
            })
        },
        [likePostHanlde.rejected]: (state, action) => {
            state.loading = false;
            state.isSuccess = false;
        },
        // Comment post
        [commentPost.pending]: (state, action) => {
            state.loading = true;
        },
        [commentPost.fulfilled]: (state, action) => {
            state.loading = false;
            state.isSuccess = true;
            let stateVal = state.value.filter(val => {
                console.log(val._id, " VALUE ID ", action.payload._id)
                return val._id === action.payload._id;
            })

            stateVal.map(val => {
                if (val._id === action.payload._id) {
                    return val.comments.push(action.payload)
                }
            })
        },
        [commentPost.rejected]: (state, action) => {
            state.loading = false;
            state.isSuccess = false;
        },
    }
})

export default postSlice;