import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../bases/basesUrl";
import { Alert } from "react-native";

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

export const changeProfil = createAsyncThunk("users/change", async (arg, {
    rejectWithValue
}) => {
    try {
        const response = await axios.put(`${baseUrl}/users/${arg.id}`, arg.data, arg.config);
        Alert.alert('Photo de profil modifiée avec succès')
        return response.data
    } catch (error) {
        rejectWithValue(error.response);
        console.log(error, " ERREUR")
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
        // UPDATE USER
        [changeProfil.pending]: (state, action) => {
            state.loading = true;
        },
        [changeProfil.fulfilled]: (state, action) => {
            state.loading = false;
            state.isSuccess = true;
            state.value = state.value.filter(val => {
                return val._id !== action.payload._id;
            })
            state.value.push(action.payload);
        },
        [changeProfil.rejected]: (state, action) => {
            state.loading = false;
            state.isSuccess = false;
        }
    }
})

export default usersSlice;