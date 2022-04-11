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
        .then(updatedUser => {
            if(!updatedUser) {
                res.status(400).json({ message: "Please provide name and bio for the user" });
            } else {
                res.json(updatedUser);
            }
        })
});

module.exports = server; // EXPORT YOUR SERVER instead of {}
