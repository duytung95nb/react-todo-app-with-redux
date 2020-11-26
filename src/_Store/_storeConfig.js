import counterSlice from "./CounterSlice";
import reduxThunk from 'redux-thunk';
import {
    configureStore
} from "@reduxjs/toolkit";
import contactSlice from "./ContactSlice";

const store = configureStore({
    reducer: {
        [counterSlice.name]: counterSlice.reducer,
        [contactSlice.name]: contactSlice.reducer
    },
    middleware: [reduxThunk]
});
export default store;