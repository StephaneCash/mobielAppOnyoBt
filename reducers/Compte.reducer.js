import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../bases/basesUrl";
import { Alert } from "react-native"

export const getCompteByUserId = createAsyncThunk("comptes/getData", async (arg, {
    rejectWithValue
}) => {
    try {
        const { data } = await axios.get(`${baseUrl}/comptes/${arg}`);
        return data
    } catch (error) {
        rejectWithValue(error.response);
        console.log(error.response)
    }
});

export const rechargeCompte = createAsyncThunk("comptes/add", async (arg, {
    rejectWithValue
}) => {

    try {
        const response = await axios.patch(`${baseUrl}/comptes/${arg && arg.userId}`, {
            num: arg.num
        });
        if (response.status === 200) {
            Alert.alert('Compte bien rechargé');
            return response.data
        }
    } catch (error) {
        rejectWithValue(error.response);
        console.log(error && error.response && error.response.data && error.response.data.message, " ERREUR");
        Alert.alert(error && error.response && error.response.data && error.response.data.message);
    }
});


export const compteslice = createSlice({
    name: "comptes",
    initialState: {
        value: [],
        isSuccess: false,
        loading: false
    },
    extraReducers: {
        //Get all comptes
        [getCompteByUserId.pending]: (state, { payload }) => {
            state.loading = true;
            state.isSuccess = false;
        },
        [getCompteByUserId.fulfilled]: (state, action) => {
            state.loading = false;
            state.value = action.payload;
            state.isSuccess = true;
        },
        [getCompteByUserId.rejected]: (state, { payload }) => {
            state.loading = false;
            state.isSuccess = false;
        },
        //Create Post
        [rechargeCompte.pending]: (state, action) => {
            state.loading = true;
        },
        [rechargeCompte.fulfilled]: (state, action) => {
            state.loading = false;
            if (action.payload) {
                state.value = action.payload;
            } else {
                state.value = state.value;
            }
            state.isSuccess = true;
        },
        [rechargeCompte.rejected]: (state, action) => {
            state.loading = false;
            state.isSuccess = false;
        },
    }
})

export default compteslice;