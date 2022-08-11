import React, { useState } from 'react'
import Moment from 'moment'
import ModalAddTodo from './ModalAddTodo'

// Calls Modal either to make a new Todo item or to update an existing Todo item
// Called from App.js(for new item) or from ShowTodoList for updating item
const CallTodoModal = ({ todoItem=false, setNewTodo }) => {

  // set states for handling opening, closing and displaying the modal
  const [show, setShow] = useState(false)
  const openModal = () => setShow(true)
  const closeModal = () => setShow(false)
 
  // format date for display readability
  const showDate = (date) => {
    return Moment(date).format('MMM Do YYYY')
  }

  // return the color based on status of item
  const setStatusColor = () => {
    switch(todoItem.status) {
      case 'New': return '#390099'
      case 'In Progress': return '#347fc4'
      case 'Done': return '#0b6e4f'
      case 'On Hold': return '#d90368'
      default: return '#1c1f33'
    }
  }
  
  return (
    <div className='modal-call'>

      {/* this is calling modal for CREATING a new todo item */}
      {!todoItem && 
        <>
          <button className='add-new-button' disabled={show} onClick={openModal}>Add a new todo item</button>
          {show && 
            <ModalAddTodo 
              show={show}
              closeModal={closeModal}
              todoItem={false}
              setNewTodo={setNewTodo} />
          }
        </>
      }

      {/* This is setting up every todo item in the list for UPDATING with a modal */}
      {todoItem &&
        <>
          <div className="todo-item-content" onClick={openModal}>
            <div className="todo-title">{todoItem.title}</div>
            <div className="todo-date">{showDate(todoItem.deadline)}</div>
            <div className="todo-status" style={{ backgroundColor: setStatusColor()}}>{todoItem.status}</div>
          </div>
          {show && 
            <ModalAddTodo 
              show={show}
              closeModal={closeModal}
              todoItem={todoItem}
              setNewTodo={setNewTodo} />
          }
        </>
      }

    </div>
  )
}

export default CallTodoModal