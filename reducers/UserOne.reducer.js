import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../bases/basesUrl";
import { Alert } from "react-native";

export const getOneUser = createAsyncThunk("user/getData", async (arg, {
    rejectWithValue
}) => {
    try {
        const { data } = await axios.get(`${baseUrl}/users/${arg}`);
        return data
    } catch (error) {
        rejectWithValue(error.response);
        console.log(error.response)
    }
});

export const changeProfil = createAsyncThunk("user/change", async (arg, {
    rejectWithValue
}) => {
    try {
        const response = await axios.put(`${baseUrl}/users/${arg && arg.id}`, arg.data, arg.config);
        Alert.alert('Photo de profil modifiée avec succès')
        return response && response.data
    } catch (error) {
        rejectWithValue(error.response);
        console.log(error, " ERREUR");
    }
});

export const modifUser = createAsyncThunk("user/modif", async (arg, {
    rejectWithValue
}) => {
    try {
        const response = await axios.put(`${baseUrl}/users/${arg && arg.id}`, {
            statusLive: arg.statusLive
        });
        return response && response.data
    } catch (error) {
        rejectWithValue(error.response);
        console.log(error, " ERREUR");
    }
});

export const userSlice = createSlice({
    name: "user",
    initialState: {
        value: [],
        isSuccess: false,
        loading: false
    },
    extraReducers: {

        [getOneUser.pending]: (state, { payload }) => {
            state.loading = true;
            state.isSuccess = false;
        },
        [getOneUser.fulfilled]: (state, action) => {
            state.loading = false;
            state.value = action.payload;
            state.isSuccess = true;
        },
        [getOneUser.rejected]: (state, { payload }) => {
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
            state.value = action && action.payload;
        },
        [changeProfil.rejected]: (state, action) => {
            state.loading = false;
            state.isSuccess = false;
        },

        // UPDATE USER
        [modifUser.pending]: (state, action) => {
            state.loading = true;
        },
        [modifUser.fulfilled]: (state, action) => {
            state.loading = false;
            state.isSuccess = true;
            state.value = action && action.payload;
        },
        [modifUser.rejected]: (state, action) => {
            state.loading = false;
            state.isSuccess = false;
        }
    }
})

export default userSlice;