import React, { useState } from 'react';

function UpdateTodo(props) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [description , setDescription] = useState(props.description);
    const [title, setTitle] = useState(props.title);

    const updateDescription = async (e) => {
        e.preventDefault();
        try {
            const body = { title, description };
            const response = await fetch(`/todos/${props.todo_id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
            window.location = "/";
        } catch (err) {
            console.error(err.message);
        }
    }

    const handleChange = (e) => {
        setDescription(e.target.value);
    }

    const handleTitle = (e) => {
        setTitle(e.target.value);
    }

    return (
        <>
            <button onClick={handleShow} className="block text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center" type="button" data-modal-toggle="authentication-modal">
                Edit
            </button>

            <div tabindex="-1" aria-hidden="true" className={show ? "flex items-center backdrop-blur-[2px] ease-in-out duration-300 md:justify-center overflow-y-auto overflow-x-hidden absolute z-50 w-screen md:inset-0 h-modal md:h-screen" : "hidden"}>
                <div className="relative p-4 w-full max-w-md h-full md:h-auto">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <button type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-toggle="authentication-modal">
                            <svg onClick={handleClose} aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                        <div className="py-6 px-6 lg:px-8">
                            <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">Edit Todo</h3>
                            <form className="space-y-6" action="#">
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Title</label>
                                    <input value={title} onChange={handleTitle} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5" />
                                </div>
                                <div>
                                    <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Description</label>
                                    <textarea value={description} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                                </div>
                                <div className="flex justify-between">

                                </div>
                                <div className='flex gap-2'>
                                <button type="submit" className=" text-white bg-green-600 hover:bg-green-800 focus:ring-4font-medium rounded-lg text-sm px-10 py-2.5 text-center]">Reset</button>
                                <button type="submit" className="w-full text-white bg-green-600 hover:bg-green-800 focus:ring-4font-medium rounded-lg text-sm px-4 py-2.5 text-center]" onClick={updateDescription}>Save Changes</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default UpdateTodo;