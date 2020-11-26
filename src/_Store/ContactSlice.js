import { createSlice } from "@reduxjs/toolkit";
import _appConstant from "../Constants/_appConstant";


const contactSlice = createSlice({
    name: 'contact',
    initialState: {
        contacts: [],
        loading: true,
        error: null,
        addingContactInProgress: false,
        addingContactFailed: null,
        addingContact: {
            name: '',
            age: ''
        },
        deletingContact: null
    },
    reducers: {
        loadingData: (state, isLoadingAction) => {
            state.loading = isLoadingAction.payload
        },
        loadSuccess: (state, contactsAction) => {
            state.contacts = contactsAction.payload
        },
        loadFailed: (state, contactsAction) => {
            state.error = contactsAction.payload
        },
        toggleAddingContactInProgress: (state, addingContactAction) => {
            state.addingContactInProgress = addingContactAction.payload
        },
        toggleDeletingContact: (state, deletingContactAction) => {
            state.deletingContact = deletingContactAction.payload
        },
        changeAddingContact: (state, addingContactAction) => {
            state.addingContact = addingContactAction.payload
        },
        addContact: (state, addedContactAction) => {
            state.addingContact = {name: '', age: ''};
            state.contacts.push(addedContactAction.payload);
        },
        deleteContact: (state, deletedContactAction) => {
            state.contacts = state.contacts.filter(c => c.id !== deletedContactAction.payload.id);
        },
        deleteContactFailed: (state, deletedContactFailedAction) => {
            state.error = deletedContactFailedAction.payload
        },
        addContactFailed: (state, addingContactAction) => {
            state.addingContactFailed = addingContactAction.payload;
        }
    }
});

export function loadContactsAsync(){
    return dispatch => {
        dispatch(contactSlice.actions.loadingData(true));
        return fetch(`${_appConstant.contactOrigin}/api/contacts`, {
            method: 'GET',
            cache: 'default'
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
        dispatch(contactSlice.actions.toggleAddingContactInProgress(true));
        fetch(`${_appConstant.contactOrigin}/api/contacts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(contact)
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
            dispatch(contactSlice.actions.addContactFailed(error));
        })
        .finally(() => {
            dispatch(contactSlice.actions.toggleAddingContactInProgress(false));
        });
    }
}
export function deleteContactAsync(contact) {
    return dispatch => {
        dispatch(contactSlice.actions.toggleDeletingContact(contact));
        fetch(`${_appConstant.contactOrigin}/api/contacts/${contact.id}`, {
            method: 'DELETE'
        }).then(response => {
            if(response.status == 200) {
                response.json().then(deletedContact => {
                    dispatch(contactSlice.actions.deleteContact(deletedContact));
                });
            }
            else {
                throw new Error(`Error status ${response.status}`)
            }
        })
        .catch(error => {
            dispatch(contactSlice.actions.deleteContactFailed(error));
        })
        .finally(() => {
            dispatch(contactSlice.actions.toggleDeletingContact(null));
        });
    }
}
export default contactSlice;