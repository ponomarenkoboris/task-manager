const { Schema, model } = require('mongoose');

const user = new Schema({
    userName: {
        type: String,
        requried: true
    },
    userEmail: {
        type: String,
        requried: true
    },
    password: {
        type: String,
        required: true,
    },
    goals: [
        {
            id: Number,
            priority: Number,
            name: String,
            tasks: [
                {
                    id: Number,
                    description: String
                }
            ]
        },
    ]
})

module.exports = model('User', user);