import _appConstant from "../Constants/_appConstant";
import apiService from "./ApiService";

const { createSlice } = require("@reduxjs/toolkit");

const todoSlice = createSlice({
    name: 'todo',
    initialState: {
        loading: true,
        todoList: null,
        error: null,
        addingTask: false
    },
    reducers: {
        loadingData: (state, isLoadingAction) => {
            state.loading = isLoadingAction.payload
        },
        loadSuccess: (state, todoListAction) => {
            state.error = null;
            state.todoList = todoListAction.payload;
        },
        loadFailed: (state, errorAction) => {
            state.error = errorAction.payload;
        },
        addingTask: (state, addingTaskAction) => {
            state.addingTask = addingTaskAction.payload
        },
        addTask: (state, addedTaskAction) => {
            state.todoList.todos.push(addedTaskAction.payload)
        },
        addTaskFailed: (state, errorAction) => {
            state.todoList.todos.push(errorAction.payload)
        },
    }
});
export function loadTodoList(assigneeId) {
    return dispatch => {
        dispatch(todoSlice.actions.loadingData(true));
        return apiService.get(`${_appConstant.apiOrigin}/api/tasks`, { assigneeId })
            .then(tasksResult => {
                dispatch(todoSlice.actions.loadSuccess(tasksResult));
            })
            .catch(err => {
                dispatch(todoSlice.actions.loadFailed(err));
            })
            .finally(() => {
                dispatch(todoSlice.actions.loadingData(false))
            });
    }
}
export function addTodoAsync(todoItem) {
    return dispatch => {
        dispatch(todoSlice.actions.addingTask(true));
        return apiService.post(`${_appConstant.apiOrigin}/api/tasks`, {
            title: todoItem.title })
            .then(addedTask => dispatch(todoSlice.actions.addTask(addedTask)))
            .catch(err => dispatch(todoSlice.actions.addTaskFailed(err)))
            .finally(() => {
                dispatch(todoSlice.actions.addingTask(false))
            });
    }
}
export default todoSlice