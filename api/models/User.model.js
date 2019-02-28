
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// Setup schema
let userSchema = new Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'normal'
    },
    create_date: {
        type: Date,
        default: Date.now
    }
});


// Export User model
let User = module.exports = mongoose.model('User', userSchema);


module.exports.get = function (callback, limit) {
    User.find(callback).limit(limit);
}