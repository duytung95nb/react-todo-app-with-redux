const { createSlice } = require("@reduxjs/toolkit");

const todoSlice = createSlice({
    name: 'todo',
    initialState: {
        loading: true,
        todoList: null,
    },
    reducers: {
        loadingData: (state, isLoading) => {
            state.loading = isLoading
        },
        loadSuccess: (state, todoList) => {
            state.todoList = todoList;
        },
        loadFailed: (state, todoList) => {
            state.todoList = todoList;
        },
    }
});
export default todoSlice