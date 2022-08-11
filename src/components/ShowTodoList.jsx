import React, { useState, useEffect } from 'react'
import CallTodoModal from './CallTodoModal'
import '../styles/todoList.css'

// displays the entire todo list and preps for items to be updated
const ShowTodoList = ({ todoList, setTodoList }) => {
    // state for todo item that will be updated
    const [updateTodo, setUpdateTodo] = useState({
        id: '',
        title: '',
        deadline: '',
        status: ''
    })

    // the updated todo item is updated into the todo list
    useEffect(() => {
        if (updateTodo.id) {
            //console.log('Updated Item: ', updateTodo)
            const newTodos = [...todoList]
            const updateObj = newTodos.find(todo => todo.id === updateTodo.id)
            updateObj.title = updateTodo.title
            updateObj.deadline = updateTodo.deadline
            updateObj.status = updateTodo.status
            setTodoList(newTodos)
        }
    }, [updateTodo])

  return (
    <div className='todo-list'>
        {todoList.map(item => (
            <div className="todo-item" key={item.id}>
                <CallTodoModal todoItem={item} setNewTodo={setUpdateTodo} />
            </div>
        ))}
    </div>
  )
}

export default ShowTodoList