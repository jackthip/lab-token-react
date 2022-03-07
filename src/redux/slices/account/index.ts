import { createSlice } from "@reduxjs/toolkit";

export interface IAccount {
    address: string;
}

const initialState: IAccount = {
    address: "",
};

const accountSlice = createSlice({
    name: "account",
    initialState,
    reducers: {
        setAccount: (state, action) => {
            state.address = action.payload;
        },
        clearAccount: (state) => {
            state.address = "";
        },
    },
});

export const { setAccount, clearAccount } = accountSlice.actions;

export default accountSlice.reducer;
