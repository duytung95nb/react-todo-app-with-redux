import React from 'react';
import Todo from './ToDoContainer/Todo';
import './App.scss';
import ContactsList from './ContactsContainer/ContactsList';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Todo />
        <ContactsList />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
