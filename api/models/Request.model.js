
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// Setup schema
let requestSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    visit_date: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        default: "Pending"
    },
    reject_reason: String,
});


// Export Request model
let Request = module.exports = mongoose.model('Request', requestSchema);


module.exports.get = function (callback, limit) {
    Request.find(callback).limit(limit);
}