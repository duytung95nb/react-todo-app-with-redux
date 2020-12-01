import React from 'react';

function BaseList({ elements, uniqueField }) {
    const onDeleteClicked = ();
    return <ul className="list-group align-middle List">
        {elements.map(element => <li className="list-group-item List__Item"
            key={element[uniqueField]}>
            {element.title}
            <button className="btn btn-danger btn-sm float-right"
                onClick={this.onDeleteClicked.bind(this, element)}>Delete</button>
        </li>)}
    </ul>
}
export default BaseList;