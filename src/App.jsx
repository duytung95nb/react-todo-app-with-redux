import React from 'react';
import Todo from './ToDoContainer/Todo';
import './App.scss';
import ContactsList from './ContactsContainer/ContactsList';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        Header
      </header>
      <section className="App-content">
        <Todo />
        <ContactsList />
      </section>
    </div>
  );
}

export default App;
