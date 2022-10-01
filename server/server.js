const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');

//middleware
app.use(cors());
app.use(express.json()); //req.body

//ROUTES//

//create a todo
app.post('/todos', async (req, res) => {
    try {
        const { description } = req.body;
        const newTodo = await pool.query(
            "INSERT INTO todo (description) VALUES($1) RETURNING *",
            [description]
        );

        res.json(newTodo.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

//get all todos from the database
app.get('/todos',async(req,res)=>{
    try{
        const getTodos = await pool.query(
            "SELECT * FROM todo"
        );
        res.json(getTodos.rows);
    }
    catch(err){
        console.log(err.message)
    }
})

//get a todo from id 
app.get('/todos/:id',async(req,res)=>{
    try{
        const {id} = req.params;
        const getTodo = await pool.query(
            "SELECT * FROM todo WHERE todo_id = $1",[id]
        );
    res.json(getTodo.rows[0]);
    }
    catch(err){
        console.error(err.message);
    }
});

//edit todo with id
app.put('/todos/:id',async(req,res)=>{
    try{
        const {id} = req.params;
        const {description} = req.body;
        const editTodo = await pool.query(
            "UPDATE todo SET description = $1 WHERE todo_id = $2",[description,id]
        )
        res.json("Todo was edited");
    }
    catch(err){
        console.log(err.message);
    }
})

//delete todo with id
app.delete('/todos/:id',async(req,res)=>{
    try{
        const {id} = req.params;
        const deleteTodo = await pool.query(
            "DELETE FROM todo WHERE (todo_id) = $1",[id]
        )
        res.json("Todo DELETED!")
    }
    catch(err){
        console.log(err.message);
    }
})


//server
app.listen(4000,()=>{
    console.log("Server is running on port 4000");
    console.log("http://localhost:4000");
})