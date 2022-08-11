import React, { useState, useEffect } from 'react'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import ReactDOM from 'react-dom'
import { v4 as uuid } from 'uuid'
import SelectStatus from './SelectStatus'
import '../styles/modal.css'

const statusTypes = [
    { label: '...', value: '' },
    { label: 'New', value: 'New' },
    { label: 'In Progress', value: 'In Progress' },
    { label: 'Done', value: 'Done' },
    { label: 'On Hold', value: 'On Hold' },
]

// Displays the modal either for creating or updating a todo item
const ModalAddTodo = ({ show, closeModal, todoItem, setNewTodo }) => {
    
    // setting states for getting user input for the todo item
    const [itemStatus, setStatus] = useState('')
    const dateInModal = todoItem ? todoItem.deadline : new Date()
    const [deadline, setDeadline] = useState(dateInModal)
    const [title, setTitle] = useState('')

    // This enables clsing the modal with the escape key on keyboard
    useEffect(() => {
        const closeOnEscKey = e => e.key === 'Escape' ? handleCloseModal() : null
        document.body.addEventListener('keydown', closeOnEscKey)
        return () => {
            document.body.removeEventListener('keydown', closeOnEscKey)
        }
    }, [])

    // initializes all the input states
    const clearStates = () => {
        setTitle('')
        setDeadline(dateInModal)
        setStatus('')
    }

    // initializes states and closes modal
    const handleCloseModal = () => {
        clearStates()
        closeModal()
    }

    const handleTitle = (e) => {
        setTitle(e.target.value)
    }

    // gets a unique id for every new todo item
    const getTodoId = () => todoItem ? todoItem.id : uuid().slice(0, 8)

    // sets/updates the state of a todo item when the form is submitted
    const handleSubmit = (e) => {
        e.preventDefault()
        setNewTodo({
            id: getTodoId(),
            title: title ? title : e.target[0].value,
            deadline: deadline,
            status: itemStatus ? itemStatus : e.target[2].value
        })
        handleCloseModal()
    }

    const modal = (
        <>
            <div className={show ? 'overlay' : 'hide'} onClick={handleCloseModal} />
            <div className={show ? 'modal' : 'hide'}>

                <button className='x-cancel' onClick={handleCloseModal}>X</button>
                <div className="modal-content">
                    {todoItem ? <h3>Update todo item</h3> : <h3>Add new todo item</h3>}
                    
                    {/* modal form to get user input when creating new or updating todo item */}
                    <form className="modal-form" onSubmit={handleSubmit}>
                        <div className="modal-title">
                            <label htmlFor='title'>Title</label>
                            <input type='text' required defaultValue={todoItem.title} placeholder='Title' id='title' onChange={handleTitle} />
                        </div>
                        
                        <div className="modal-select">
                            <div className="modal-datepicker">
                                <label>Deadline</label>
                                <DatePicker 
                                    className='datepicker'
                                    selected={deadline}
                                    onChange={date => setDeadline(date)} />
                            </div>

                            <SelectStatus value={todoItem.status} statusTypes={statusTypes} setStatus={setStatus} />
                        </div>

                        <div className="modal-buttons">
                            <button className='cancel' type='button' onClick={handleCloseModal}>Cancel</button>
                            <button className='add' type='submit'>{todoItem ? 'Update' : 'Add'}</button>
                        </div>

                    </form>

                </div>

            </div>
        </>
    )
  return ReactDOM.createPortal(modal, document.getElementById('modal-root'))
}

export default ModalAddTodo