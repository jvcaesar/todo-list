import React, { useState, useEffect } from 'react';
import './App.css';
import ShowTodoList from './components/ShowTodoList';
import CallTodoModal from './components/CallTodoModal';

// Main App for the Todo project
const App = () => {
  // setting states for the entire todo list and for a new todo item
  const [todoList, setTodoList] = useState([])
  const [newTodo, setNewTodo] = useState({
    id: '',
    title: '',
    deadline: '',
    status: ''
  })

  // Adds a new todo item to the list when the new item state is updated
  useEffect(() => {
    if (newTodo.title) {
      const newTodos = [...todoList]
      newTodos.push(newTodo)
      setTodoList(newTodos)
      setNewTodo('')
    }
  }, [newTodo])

  return (
    <div className="main-container">

      <h1 className="main-title">Todo Project for Integrify</h1>

      {/* Get a new todo item */}
      <CallTodoModal todoItem={false} setNewTodo={setNewTodo} />

      {/* Display the list of todo items */}
      <ShowTodoList todoList={todoList} setTodoList={setTodoList} />

    </div>
  );
}

export default App;
