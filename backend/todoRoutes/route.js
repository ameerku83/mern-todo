const express = require('express');
const TodoModel = require('../todoModel');
const router = express.Router();


// Get all todos
router.get('/todo', async (req, res) => {
    try {
        const todos = await TodoModel.find();
        res.send(todos);
    } catch (err) {
        res.status(500).send({ err });
    }        
});

// Create a new todo
router.post('/todo', async (req, res) => {
    const todo = new TodoModel({
        task: req.body.task,
        
    });
    try {  
        const newTodo = await todo.save();
        res.status(201).send(newTodo);
    } catch (err) {
        res.status(400).send({ message: err.message });
    }
});

// Update a todo
router.put('/todo/:id', async (req, res) => {
    try {
        const todo = await TodoModel.findById(req.params.id);
        if (req.body.task != null) {
            todo.task = req.body.task;
        }
       
        const updatedTodo = await todo.save();
        res.send(updatedTodo);
    } catch (err) {
        res.status(400).send({ message: err.message });
    }
});

// Delete a todo
router.delete('/todo/:id', async (req, res) => {
    try {
        await TodoModel.findByIdAndDelete(req.params.id);
        res.send({ message: 'Todo deleted' });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }   
});





module.exports = router;
        