const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');
const PORT = process.env.PORT || 5000;
const path = require("path");

//process.env.PORT is for heroku
require('dotenv').config();

//middleware
app.use(cors());
app.use(express.json()); //req.body

//process.end.NODE_ENV is for heroku
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "client/build")));
}
app.use(express.static(path.join(__dirname ,"client/build")));

//ROUTES//

//create a todo
app.post('/todos', async (req, res) => {
    try {
        const { title } = req.body;
        const { description } = req.body;
        const {due_date} = req.body;
        const newTodo = await pool.query(
            "INSERT INTO todo (title,description,due_date) VALUES ($1,$2,$3) RETURNING *",
            [title,description,due_date]
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
        const {title} = req.body;
        const {description} = req.body;
        const editTodo = await pool.query(
            "UPDATE todo SET description = $1 , title = $2 WHERE todo_id = $3",[description,title,id]
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

//delete all todos
app.delete('/todos',async(req,res)=>{
    try{
        const deleteAll = await pool.query(
            "DELETE FROM todo"
        )
        res.json("All Todos DELETED!")
    }
    catch(err){
        console.log(err.message);
    }
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname,'client/build/index.html'));
});


//server
app.listen(PORT,()=>{
    console.log(`Server has started on port ${PORT}`);
    console.log(`http://localhost:${PORT}`);
})