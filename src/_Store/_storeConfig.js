import counterSlice from "./CounterSlice";
import reduxThunk from 'redux-thunk';
import {
    configureStore
} from "@reduxjs/toolkit";
import contactSlice from "./ContactSlice";
import todoSlice from "./TodoSlice";

const store = configureStore({
    reducer: {
        [counterSlice.name]: counterSlice.reducer,
        [contactSlice.name]: contactSlice.reducer,
        [todoSlice.name]: todoSlice.reducer
    },
    middleware: [reduxThunk]
});
export default store;