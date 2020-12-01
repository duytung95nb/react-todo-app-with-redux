import React from 'react';
import { connect } from 'react-redux';
import contactSlice, { addContactAsync, deleteContactAsync, loadContactsAsync } from '../_Store/ContactSlice';
import store from '../_Store/_storeConfig';
import './ContactsList.scss';
class ContactsList extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        store.dispatch(loadContactsAsync());
    }
    contactNameChanged = (event) => {
        store.dispatch(contactSlice.actions.changeAddingContact({
            ...this.props.addingContact,
            name: event.target.value
        }))
    }
    contactAgeChanged = (event) => {
        store.dispatch(contactSlice.actions.changeAddingContact({
            ...this.props.addingContact,
            age: event.target.value
        }));
    }
    addContact = () => {
        store.dispatch(addContactAsync(this.props.addingContact));
    }
    onDeleteItemClicked(contact) {
        store.dispatch(deleteContactAsync(contact));
    }
    render() {
        return <div className={`ContactsList`}>
            <input className="ContactsList__InputName" type="text"
                value={this.props.addingContact.name}
                onChange={this.contactNameChanged}/>
            <input className="ContactsList__InputAge form-control"
                type="number" value={this.props.addingContact.age}
                onChange={this.contactAgeChanged}/>
            <button className="btn btn-primary" onClick={this.addContact}>Add contact {this.props.loading? "Loading": ""}</button>
            <ul className="list-group align-middle List">
                {this.props.contacts.map(c =>
                    <li className={`list-group-item List__Item ${
                        c.id == this.props.deletingContact?.id ? "List__Item--Deleting": ""}`}
                        key={c.id}>{c.name}
                        <button className="btn btn-danger float-right"
                        onClick={this.onDeleteItemClicked.bind(this, c)}>Delete</button></li>)}
            </ul>
        </div>
    }
}

function mapStateToProps(state) {
    console.log('mapStateToProps contact list runs');
    return { ...state[contactSlice.name] }
}
export default connect(mapStateToProps)(ContactsList);