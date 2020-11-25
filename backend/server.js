const express = require('express');
const app = express();
const http = require('http');
const contactRouter = require('./contact');
http.Server(app);
app.use('/api', contactRouter);
const port = 4000;
console.log(`App is listening at port ${port}`)
app.listen(port);