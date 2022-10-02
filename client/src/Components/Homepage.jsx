import React from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import TodoList from './TodoList'

const Homepage = () => {
    return (
        <div>
            <Navbar />
            <div className='flex'>
                <Sidebar />
                <TodoList />
            </div>
        </div>
    )
}

export default Homepage