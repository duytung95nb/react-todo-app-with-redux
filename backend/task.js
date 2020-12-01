const express = require('express');
const taskRouter = express.Router();
let tasks = [];
let currTaskId = 0;
taskRouter.use((req, res, next) => {
    // Delay all request progress for 500ms to looks like real api call
    setTimeout(() => {
        next()
    }, 500)
});
taskRouter.get('/', (req, res) => {
    const resultTasks = tasks.filter(task => task.status !== 'Deleted');
    res.status(200).json({
        assignee: {
            name: 'Tung Dao'
        },
        todos: resultTasks
    });
});
taskRouter.get('/:id', (req, res) => {
    res.status(200).json(tasks[0]);
});
taskRouter.post('/', (req, res) => {
    console.log('Request body is ', req.body);
    const createdTask = {
        id: ++currTaskId,
        title: req.body.title,
        deadline: null,
        status: 'Active', //(Active, Completed, Deleted),
        assigneeId: 1,
        createdDate: Date.now(),
        createdUserId: 1
    };
    tasks.push(createdTask);
    res.status(201).json(createdTask);
});
taskRouter.delete('/:id', (req, res) => {
    console.log('req param id', req.params.id);
    const deletingTask = tasks.find(c => c.id == req.params.id);
    deletingTask.status = 'Deleted';
    res.status(200).json(deletingTask);
});
module.exports = taskRouter;