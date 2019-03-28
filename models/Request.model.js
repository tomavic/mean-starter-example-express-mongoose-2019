
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// Setup schema
let requestSchema = new Schema({
    creatorId: { 
        type: mongoose.Schema.ObjectId, 
        ref: 'User', 
        required: true 
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        default: "Pending"
    },
    reason: String,
});


// Export Request model
let Request = module.exports = mongoose.model('Request', requestSchema);


module.exports.get = function (callback, limit) {
    Request.find(callback).limit(limit);
}