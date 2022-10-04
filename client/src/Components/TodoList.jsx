import React from 'react'
import Addtask from './Addtask'
import { useState, useEffect } from 'react';
import TodoCard from './TodoCard';

const TodoList = () => {
  const [todos, setTodos] = useState([]);

  const getTodos = async () => {
    try{
      const response = await fetch("/todos");
      const jsonData = await response.json();
      console.log(jsonData);
      setTodos(jsonData);
    }
    catch(err){
      console.error(err.message);
    }
  }

  useEffect(() => {
    getTodos();
  }, []);
  return (
    <div className='flex-col-reverse lg:flex-row w-full flex'>
      <div className='lg:w-[100%] w-[100%] lg:min-h-screen h-auto lg:h-auto bg-green border border-r-gray-200'>
        <h1 className='text-2xl text-center mt-4 mb-4'>To Be Done</h1>
        <div>
          <div className="grid content-center justify-items-center gap-6">
            {todos.map
              (todo => ( 
            <TodoCard todo_id ={todo.todo_id} title = {todo.title} description = {todo.description} date ={todo.create_date} due={todo.due_date} todos={todos} setTodos = {setTodos}/>))}
          </div>
        </div>
      </div>
      <Addtask />
    </div>
  )
}

export default TodoList