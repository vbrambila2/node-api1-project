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
    console.log(req.params);
    User.findById(req.params.id)
        .then(user => {
            if(!user) {
                res.status(404).json({ message: "The user with the specified ID does not exist" })
            } else {
                res.json(user)
            }
        })
})

module.exports = server; // EXPORT YOUR SERVER instead of {}
