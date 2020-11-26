const express = require('express');
const contactRouter = express.Router();
const cors = require('cors');
let contacts = [{
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
let latestId = 6;
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
contactRouter.use((req, res, next) => {
    // Delay all request progress for 500ms to looks like real api call
    setTimeout(() => {
        next()
    }, 500)
});
contactRouter.get('/contacts', (req, res) => {
    res.status(200).json(contacts);
});

contactRouter.post('/contacts', (req, res) => {
    console.log('Request body is ', req.body);
    const createdContact = {
        id: ++latestId,
        name:req.body.name,
        age: req.body.age
    };
    contacts.push(createdContact);
    res.status(201).json(createdContact);
});
contactRouter.delete('/contacts/:id', (req, res) => {
    console.log('req param id', req.params.id);
    const deletingContact = contacts.find(c => c.id == req.params.id);
    contacts = contacts.filter(c => c.id != req.params.id);
    res.status(200).json(deletingContact);
});
module.exports = contactRouter;