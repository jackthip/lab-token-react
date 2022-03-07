import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IToken {
    id: number;
    name: string;
    active: boolean;
    tokenType: TokenType
}

export enum TokenType{
    Fungible,
    NonFungible
}

const counterSlice = createSlice({
    name: "tokens",
    initialState: [] as IToken[],
    reducers: {
        setToken: (state, action:PayloadAction<IToken>) => {
            state.push(action.payload);
        },
        setTokens: (state, action:PayloadAction<IToken[]>) => {
            state = action.payload;
        }
    },
});

export const { setToken, setTokens } = counterSlice.actions;

export default counterSlice.reducer;
