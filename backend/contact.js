const express = require('express');
const contactRouter = express.Router();
let contacts = [{
    id: 1,
    name: 'Tung Dao 1',
    image: 'https://lh3.google.com/u/0/ogw/ADGmqu8LwpshQFzdZc6MmDuysKiMED2ImNJBXqK4cWfA=s83-c-mo',
    superior: null,
}, {
    id: 2,
    name: 'Tung Dao 2',
    image: 'https://lh3.google.com/u/0/ogw/ADGmqu8LwpshQFzdZc6MmDuysKiMED2ImNJBXqK4cWfA=s83-c-mo',
    superior: 1
}, {
    id: 3,
    name: 'Tung Dao 3',
    image: 'https://lh3.google.com/u/0/ogw/ADGmqu8LwpshQFzdZc6MmDuysKiMED2ImNJBXqK4cWfA=s83-c-mo',
    superior: 1
}, {
    id: 4,
    name: 'Tung Dao 4',
    image: 'https://lh3.google.com/u/0/ogw/ADGmqu8LwpshQFzdZc6MmDuysKiMED2ImNJBXqK4cWfA=s83-c-mo',
    superior: 2
}, {
    id: 5,
    name: 'Tung Dao 5',
    image: 'https://lh3.google.com/u/0/ogw/ADGmqu8LwpshQFzdZc6MmDuysKiMED2ImNJBXqK4cWfA=s83-c-mo',
    superior: 2
}, {
    id: 6,
    name: 'Tung Dao 6',
    image: 'https://lh3.google.com/u/0/ogw/ADGmqu8LwpshQFzdZc6MmDuysKiMED2ImNJBXqK4cWfA=s83-c-mo',
    superior: 3
}, ];
let latestId = 6;
contactRouter.use((req, res, next) => {
    // Delay all request progress for 500ms to looks like real api call
    setTimeout(() => {
        next()
    }, 500)
});
contactRouter.get('/', (req, res) => {
    res.status(200).json(contacts);
});

contactRouter.post('/', (req, res) => {
    console.log('Request body is ', req.body);
    const createdContact = {
        id: ++latestId,
        name:req.body.name,
        age: req.body.age
    };
    contacts.push(createdContact);
    res.status(201).json(createdContact);
});
contactRouter.delete('/:id', (req, res) => {
    console.log('req param id', req.params.id);
    const deletingContact = contacts.find(c => c.id == req.params.id);
    contacts = contacts.filter(c => c.id != req.params.id);
    res.status(200).json(deletingContact);
});
module.exports = contactRouter;