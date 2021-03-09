const { Schema, model } = require('mongoose');

const goalSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    priority: {
        type: String,
        default: 1 
    }
})

module.exports = model('Goal', goalSchema);