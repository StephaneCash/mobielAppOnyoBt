import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../bases/basesUrl";
import { Alert } from "react-native"

export const getAllTransactions = createAsyncThunk("transactions/getData", async (arg, {
    rejectWithValue
}) => {
    try {
        const { data } = await axios.get(`${baseUrl}/transactions`);
        return data
    } catch (error) {
        rejectWithValue(error.response);
        console.log(error.response);
    }
});

export const createTransaction = createAsyncThunk("transactions/add", async (arg, {
    rejectWithValue
}) => {
    try {
        const response = await axios.post(`${baseUrl}/transactions`, arg);
        if (response.status === 201) {
        }
        return response && response.data
    } catch (error) {
        rejectWithValue(error.response);
        console.log(error, " ERREUR");
        Alert.alert('Erreur lors du téléchargement...');
    }
});

export const TransactionsSlice = createSlice({
    name: "transactions",
    initialState: {
        value: [],
        isSuccess: false,
        loading: false
    },
    extraReducers: {
        //Get all transactions
        [getAllTransactions.pending]: (state, { payload }) => {
            state.loading = true;
            state.isSuccess = false;
        },
        [getAllTransactions.fulfilled]: (state, action) => {
            state.loading = false;
            state.value = action.payload;
            state.isSuccess = true;
        },
        [getAllTransactions.rejected]: (state, { payload }) => {
            state.loading = false;
            state.isSuccess = false;
        },
        //Create Transaction
        [createTransaction.pending]: (state, action) => {
            state.loading = true;
        },
        [createTransaction.fulfilled]: (state, action) => {
            state.loading = false;
            state.value.unshift(action && action.payload && action.payload)
            state.isSuccess = true;
        },
        [createTransaction.rejected]: (state, action) => {
            state.loading = false;
            state.isSuccess = false;
        },
    }
})

export default TransactionsSlice;