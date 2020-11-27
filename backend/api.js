const express = require('express');
const contactRouter = require('./contact');
const taskRouter = require('./task');
const apiRouter = express.Router();
apiRouter.use('/contacts', contactRouter);
apiRouter.use('/tasks', taskRouter);
module.exports = apiRouter
