import { Navbar } from 'flowbite-react'
import React from 'react'

const Dashboard = () => {
  return (
    <div>
        <Navbar />
        <div className='flex'>
            <Sidebar />
            <div>

            </div>
        </div>
    </div>
  )
}

export default Dashboard