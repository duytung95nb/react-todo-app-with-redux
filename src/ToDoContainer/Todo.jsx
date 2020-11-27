import React from 'react';
import { connect } from 'react-redux';
import Error from '../BaseComponents/Error';
import Loading from '../BaseComponents/Loading';
import todoSlice, { addTodoAsync, loadTodoList } from '../_Store/TodoSlice';
import store from '../_Store/_storeConfig';
import './Todo.scss';
class Todo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            addingTaskTitle: '',
            inputError: false
        }
    }
    componentDidMount() {
        store.dispatch(loadTodoList(1));
    }
    renderList(error, todoList) {
        return this.props.error != null ? <Error error={error} />
            : <ul className="List">
                {todoList?.todos.map(item => <li className="List__Item" key={item.id}>{item.title}</li>)}
            </ul>
    }
    onAddItemInputChange = (event) => {
        if(event.keyCode == 13) {
            this.addTask();
        }
        this.setState({ addingTaskTitle: event.target.value });
    }
    onAddItemClicked = () => {
        this.addTask();
    }
    addTask = () => {
        if(!this.state.addingTaskTitle) {
            this.setState({ inputError: true });
            return;
        }
        store.dispatch(addTodoAsync({ title: this.state.addingTaskTitle }))
            .then(() => {
                this.setState({addingTaskTitle: ''});
            });
    }
    render() {
        return <div className="Todo">
            <div className="Todo__AddItem">
                <input type="text" className={
                    "Todo__AddItemInput " + (this.state.inputError ? 'Todo__AddItemInput--Error': '')}
                    value={this.state.addingTaskTitle}
                    onChange={this.onAddItemInputChange}/>
                <button onClick={this.onAddItemClicked}>Add</button>
            </div>
            {this.props.loading ? <Loading />
                : this.renderList(this.props.error, this.props.todoList)
            }
        </div>
    }
}
function mapStateToProps(state) {
    return { ...state[todoSlice.name] }
}

export default connect(mapStateToProps)(Todo)