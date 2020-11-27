const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const apiRouter = require('./api');

http.Server(app);
app.use(express.json());
const allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:4000'
];
const corsOptions = {
  origin: (origin, callback) => {
    const error = null;
    callback(error, allowedOrigins)
  }
}
app.use(cors(corsOptions));
app.use('/api', apiRouter);
const port = 4000;
console.log(`App is listening at port ${port}`)
app.listen(port);