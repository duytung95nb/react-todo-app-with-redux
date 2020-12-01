import _appConstant from "../Constants/_appConstant";
import apiService from "./ApiService";

const { createSlice } = require("@reduxjs/toolkit");

const todoSlice = createSlice({
    name: 'todo',
    initialState: {
        loading: true,
        todoList: null,
        error: null,
        addingTask: false,
        deletingTask: false
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
        deleteTask: (state, deletedTaskAction) => {
            state.todoList.todos = state.todoList.todos
                .filter(t => t.id != deletedTaskAction.payload.id)
        },
        deletingTask: (state, deletingTaskAction) => {
            state.deletingTask = deletingTaskAction.payload
        },
        deleteTaskFailed: (state, deletedTaskFailedAction) => {
            state.deletingTask = deletedTaskFailedAction.payload
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
export function deleteTodoAsync(itemId) {
    return dispatch => {
        dispatch(todoSlice.actions.deletingTask(true));
        return apiService.delete(`${_appConstant.apiOrigin}/api/tasks/${itemId}`)
            .then(deletedTask => dispatch(todoSlice.actions.deleteTask(deletedTask)))
            .catch(err => dispatch(todoSlice.actions.deleteTaskFailed(err)))
            .finally(() => {
                dispatch(todoSlice.actions.deletingTask(false))
            });
    }
}
export default todoSlice