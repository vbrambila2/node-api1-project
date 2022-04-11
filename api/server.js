// BUILD YOUR SERVER HERE
const express = require('express');
const User = require('./users/model');

const server = express();

server.use(express.json());

server.get('/api/users', (req, res) => {
    User.find()
        .then(user => {
            res.json(user);
        });
});

server.get('/api/users/:id', (req, res) => {
    User.findById(req.params.id)
        .then(user => {
            if(!user) {
                res.status(404).json({ message: "The user with the specified ID does not exist" });
            } else {
                res.json(user)
            }
        })
});

server.post('/api/users', (req, res) => {
    let user = req.body;
    User.insert(user)
        .then(user => {
            if(!user) {
                res.status(400).json({ message: "Please provide name and bio for the user" });
            } else {
                res.status(201).json(user);
            }
        })
});

server.put('/api/users/:id', (req, res) => {
    let id = req.params.id;
    let user = req.body;

    User.update(id, user)
        .then(updatedUser => {
            if(!id) {
                res.status(404).json({ message: "The user with the specified ID does not exist" });
            } else if (!user.name || !user.bio) {
                res.status(400).json({ message: "Please provide name and bio for the user" });
            } else {
                res.json(updatedUser);
            }
        })
})

server.delete('/api/users/:id', (req, res) => {
    let id = req.params.id;

    User.remove(id)
        .then(user => {
            if(!user) {
                res.status(404).json({ message: "The user with the specified ID does not exist" })
            } else {
                res.json(user)
            }
        })
})

module.exports = server; // EXPORT YOUR SERVER instead of {}
