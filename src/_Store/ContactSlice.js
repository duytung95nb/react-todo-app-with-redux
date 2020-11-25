import { createSlice } from "@reduxjs/toolkit";


const contactSlice = createSlice({
    name: 'contact',
    initialState: {
        contacts: [],
        loading: true,
        error: null,
    },
    reducers: {
        loadSuccess: (state, contactsAction) => {
            state.contacts = contactsAction.payload
        },
        loadFailed: (state, contactsAction) => {
            state.error = contactsAction.payload
        }
    }
});

export function loadContactsAsync(){
    return dispatch => {
        fetch('http://localhost:4000/api/contacts', {
            method: 'GET'
        }).then(response => {
            if(response.status == 200) {
                response.json().then(jsonResult => {
                    dispatch(contactSlice.actions.loadSuccess(jsonResult));
                })
            }
            else {
                throw new Error(`Error status ${response.status}`)
            }
        }).catch(error => {
            dispatch(contactSlice.actions.loadFailed(error))
        })
    }
}
export default contactSlice;