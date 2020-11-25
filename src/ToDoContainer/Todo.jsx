import React from 'react';
import { connect } from 'react-redux';
import counterSlice from '../_Store/CounterSlice';
import { incrementAsync } from '../_Store/CounterSlice';
import store from '../_Store/_storeConfig';

class Todo extends React.Component {
    constructor(props) {
        super(props);
    }
    onIncrementAsyncClicked = () => {
        store.dispatch(incrementAsync());
    }
    onIncrementClicked = () => {
        store.dispatch(counterSlice.actions.incremented());
    }
    render() {
        return <div>
            Current counter {this.props.counter}
            <button onClick={this.onIncrementClicked}>Increment</button>
            <button onClick={this.onIncrementAsyncClicked}>Increment async</button>
        </div>
    }
}
function mapStateToProps(state) {
    return { counter: state[counterSlice.name] }
}

export default connect(mapStateToProps)(Todo)