import React, { useEffect } from 'react'
import Calendar from 'react-calendar';
import { useState } from 'react';

const Addtask = () => {
    const [value, onChange] = useState(new Date());
    let today = new Date();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [due, setDue] = useState("");

    const handleChange = (e) => {
        setTitle(e.target.value);
    }

    const handleDescription = (e) => {
        setDescription(e.target.value); 
    }

    const handleDue = (e) => {
        setDue(e.target.value); 
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
          const response = await fetch("/todos", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({title: title, description: description, due_date: due})
          }
          );
          window.location = "/";
          console.log(response);
        }
        catch(err){
          console.error(err.message);
        }
    }

    const clearAllTodos = async (e) => {
      e.preventDefault();
      try{
        const response = await fetch("/todos", {
          method: "DELETE",
          headers: {"Content-Type": "application/json"},
      }
        );
        window.location = "/";
        console.log(response);
    }
    catch(err){
      console.error(err.message);
    }
  }

  return (
    <div className='flex-col w-full items-center bg-gray-100 h-[100%] lg:h-auto lg:min-h-screen'>
        <div>
          <h1 className='text-2xl py-4 text-center'>Add Tasks</h1>
        </div>
        <form action="" className='gap-6' onSubmit={handleSubmit}>
          <div className='grid w-[80%]'>
          <label htmlFor="">Title</label>
          <input type="text" className='py-4 rounded-xl px-4' placeholder='Enter Title' value={title} onChange={handleChange}/>
          </div>
          <div className='grid w-[80%]'>
          <label htmlFor="">Description</label>
          <input type="text" className='py-4 rounded-xl px-4' placeholder='Enter Description' value = {description} onChange={handleDescription}/>
          </div>
          <div className='grid w-[80%]'>
          <label htmlFor="">Due Date</label>
          <input type="date" className='py-4 rounded-xl px-4' value={due} onChange={handleDue}/>
          </div>
          <div className='flex gap-5'>
          <button class="bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-4 rounded-md">
            Add Todo
          </button>
          <button class="bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-4 rounded-md" onClick={clearAllTodos}>
            Clear All
          </button>
          </div>
          <span>today's date : {String(today.toDateString())}</span>
        </form>
        <div className=' lg:flex grid mb-5 justify-center mt-5 items-center'>
        <Calendar className='mt-3' onChange={onChange} value={value} />
        </div>
      </div>
  )
}

export default Addtask