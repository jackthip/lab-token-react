import { combineReducers } from "redux";
import account from "redux/slices/account";
import counter from "redux/slices/counter";
import token from "redux/slices/token";


const rootReducer = combineReducers({ counter, account, token});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
