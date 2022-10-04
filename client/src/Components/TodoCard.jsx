import React from 'react'
import { useState } from 'react';
import UpdateTodo from './UpdateTodo';

const TodoCard = (props) => {
    let date = props.date;
    let datePart = date.split("T")[0];
    console.log(props.todo_id)

    const deleteTodo = async (id) => {
        try {
            const response = await fetch(`/todos/${id}`, {
                method: "DELETE"
            });
            props.setTodos(props.todos.filter(todo => todo.todo_id !== id));
        } catch (err) {
            console.error(err.message);
        }
    }

  return (
        <div className="block p-6 rounded-lg shadow-lg bg-white w-[90%] max-w-[90%]">
              <div className='flex justify-between items-center'>   
              <h5 className="text-gray-900 text-xl leading-tight font-medium mb-2">{props.title}</h5>
              <h5 className="text-gray-400 text-sm leading-tight font-medium mb-2 mx-6">Create Date : {datePart} </h5>
              </div>
                  <p className="text-gray-700 text-base mb-4">
                 {props.description}
                </p>
            <div className='flex items-center justify-between'>
            <div className='flex gap-5'>
            <UpdateTodo todo_id={props.todo_id} title={props.title} description={props.description} due={props.due} todos={props.todos} setTodos={props.setTodos}/>
            <button type="button" className=" inline-block px-6 py-2.5 bg-green-600 text-white font-bold text-sm leading-tight uppercase rounded shadow-md hover:text-white hover:bg-green-800 hover:shadow-lg active:shadow-lg transition duration-150 ease-in-out"
                onClick={() => deleteTodo(props.todo_id)}>Delete</button>
            </div>
            <h5 className="text-gray-400 text-sm leading-tight font-medium mb-2 mx-6">Due Date : {props.due} </h5>
            </div>
            </div>
  )
}

export default TodoCard