import React from 'react';
import { connect } from 'react-redux';
import contactSlice, { loadContactsAsync } from '../_Store/ContactSlice';
import store from '../_Store/_storeConfig';

class ContactsList extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() { 
        store.dispatch(loadContactsAsync());
    }
    render() {
        return <div className="ContactsList">
            <ul className="List">
                {this.props.contacts.map(c => <li className="List__Item" key={c.id}>{c.name}</li>)}
            </ul>
        </div>
    }
}

function mapStateToProps(state) {
    return { ...state[contactSlice.name] }
}
export default connect(mapStateToProps)(ContactsList);