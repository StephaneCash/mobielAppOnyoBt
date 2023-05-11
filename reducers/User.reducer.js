import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../bases/basesUrl";

export const getAllUsers = createAsyncThunk("users/getData", async (arg, {
    rejectWithValue
}) => {
    try {
        const { data } = await axios.get(`${baseUrl}/users`);
        return data
    } catch (error) {
        rejectWithValue(error.response);
        console.log(error.response)
    }
});

export const usersSlice = createSlice({
    name: "users",
    initialState: {
        value: [],
        isSuccess: false,
        loading: false
    },
    extraReducers: {
        //Get all posts
        [getAllUsers.pending]: (state, { payload }) => {
            state.loading = true;
            state.isSuccess = false;
        },
        [getAllUsers.fulfilled]: (state, action) => {
            state.loading = false;
            state.value = action.payload;
            state.isSuccess = true;
        },
        [getAllUsers.rejected]: (state, { payload }) => {
            state.loading = false;
            state.isSuccess = false;
        },
    }
})

export default usersSlice;