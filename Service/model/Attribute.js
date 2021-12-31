const mongoose = require('mongoose');

const AttributeSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    ipName:{
        type: String,
        required: true
    },
    ipId:{
        type: String,
        required: true
    },
    ipClass:{
        type: String,
        required: true
    },
    ipSize:{
        type: Number,
        required: true
    },
    ipType:{
        type: String,
        required: true
    },
    ipPlaceholder:{
        type: String
    },
    ipLabel:{
        type: String,
        required: true
    },
});

module.exports = Attribute = mongoose.model('attribute', AttributeSchema);