import { createSlice } from "@reduxjs/toolkit";

interface IWeb3 {
  account: number;
}

const connectWalletHandler = () => {
  if (window.ethereum && window.ethereum.isMetaMask) {
  } else {
    console.log("Need to install MetaMask");
  }
};

const initialState: IWeb3 = {
  account: 20,
};

const web3Slice = createSlice({
  name: "web3",
  initialState,
  reducers: {},
});

export const {} = web3Slice.actions;

export default web3Slice.reducer;
