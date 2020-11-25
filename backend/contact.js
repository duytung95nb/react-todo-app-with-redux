const express = require('express');
const contactRouter = express.Router();
const cors = require('cors');
const contacts = [{
    id: 1,
    name: 'Tung Dao 1'
}, {
    id: 2,
    name: 'Tung Dao 2'
}, {
    id: 3,
    name: 'Tung Dao 3'
}, {
    id: 4,
    name: 'Tung Dao 4'
}, {
    id: 5,
    name: 'Tung Dao 5'
}, {
    id: 6,
    name: 'Tung Dao 6'
}, ];
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
contactRouter.use(cors(corsOptions));
contactRouter.get('/contacts', (req, res) => {
    res.status(200).json(contacts);
});

module.exports = contactRouter;