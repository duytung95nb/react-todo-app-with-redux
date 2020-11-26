import { createSlice } from "@reduxjs/toolkit";
import _appConstant from "../Constants/_appConstant";


const contactSlice = createSlice({
    name: 'contact',
    initialState: {
        contacts: [],
        loading: true,
        error: null,
        addingContactFailed: null
    },
    reducers: {
        loadingData: (state, isLoading) => {
            state.loading = isLoading
        },
        loadSuccess: (state, contactsAction) => {
            state.contacts = contactsAction.payload
        },
        loadFailed: (state, contactsAction) => {
            state.error = contactsAction.payload
        },
        addContact: (state, addedContact) => {
            state.contacts.push(addedContact)
        },
        addContactFailed: (state, addingContact) => {
            state.addingContactFailed = addingContact;
        }
    }
});

export function loadContactsAsync(){
    return dispatch => {
        dispatch(contactSlice.actions.loadingData(true));
        fetch(`${_appConstant.contactOrigin}/api/contacts`, {
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
        }).finally(() => {
            dispatch(contactSlice.actions.loadingData(false));
        });
    }
}
export function addContactAsync(contact) {
    
    return dispatch => {
        dispatch(contactSlice.actions.loadingData(true));
        fetch(`${_appConstant.contactOrigin}/api/contacts`, {
            method: 'POST',
            body: contact
        }).then(response => {
            if(response.status == 201) {
                response.json().then(createdContact => {
                    dispatch(contactSlice.actions.addContact(createdContact));
                });
            }
            else {
                throw new Error(`Error status ${response.status}`)
            }
        })
        .catch(error => {
            dispatch(contactSlice.actions.addContact(error));
        })
        .finally(() => {
            dispatch(contactSlice.actions.loadingData(false));
        });
    }
}
export default contactSlice;