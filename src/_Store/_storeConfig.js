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

// // Still pass action objects to `dispatch`, but they're created for us
// store.dispatch(incremented())
// // {value: 1}
// store.dispatch(incremented())
// // {value: 2}
// store.dispatch(decremented())
// // {value: 1}