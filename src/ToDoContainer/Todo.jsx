import React from 'react';
import { connect } from 'react-redux';
import Error from '../BaseComponents/Error';
import Loading from '../BaseComponents/Loading';
import todoSlice, { addTodoAsync, deleteTodoAsync, loadTodoList } from '../_Store/TodoSlice';
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
    onDeleteClicked(item) {
        console.log(item);
        store.dispatch(deleteTodoAsync(item.id));
    }
    renderList(error, todoList) {
        return this.props.error != null ? <Error error={error} />
            : <ul className="list-group align-middle List">
                {todoList?.todos.map(item => <li className="list-group-item List__Item"
                    key={item.id}>
                    {item.title}
                    <button className="btn btn-danger btn-sm float-right"
                        onClick={this.onDeleteClicked.bind(this, item)}>Delete</button>
                    </li>)}
            </ul>
    }
    onAddItemKeyPress = (event) => {
        if(event.key == 'Enter' && !this.props.addingTask) {
            this.addTask();
        }
    }
    onAddItemInputChange = (event) => {
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
            <div className="Todo__AddItem mb-3">
                <input type="text" className={
                    "form-control mr-3 Todo__AddItemInput "
                        + (this.state.inputError ? 'is-invalid': '')}
                    value={this.state.addingTaskTitle}
                    onChange={this.onAddItemInputChange}
                    onKeyPress={this.onAddItemKeyPress}/>
                <button className="btn btn-primary" onClick={this.onAddItemClicked}>Add</button>
            </div>
            <Loading loading={this.props.loading}/>
            {this.props.loading ? null
                : this.renderList(this.props.error, this.props.todoList)
            }
        </div>
    }
}
function mapStateToProps(state) {
    console.log('mapStateToProps Todo runs');
    return { ...state[todoSlice.name] }
}

export default connect(mapStateToProps)(Todo)