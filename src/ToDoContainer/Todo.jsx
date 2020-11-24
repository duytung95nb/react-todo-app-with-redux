import React from 'react';
import store, { incrementAsync } from '../Store/Counter';

export class Todo extends React.Component {
    constructor(props) {
        super(props);
        console.log('store.getState()', store.getState());
        this.state = {
            counter: store.getState().value
        }
    }
    componentDidMount() {
        store.subscribe(() => {
            console.log(store.getState());
        });
    }
    onIncrementAsyncClicked = () => {
        store.dispatch(incrementAsync());
    }
    render() {
        return <div>
            Current counter {this.state.counter}
            <button onClick={this.onIncrementAsyncClicked}>Increment async</button>
        </div>
    }
}