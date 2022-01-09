const mongoose = require('mongoose')

const Token = mongoose.Schema({
    address: {
        type: mongoose.Schema.Types.String,
        ref: 'Collections',
        required: true
    },
    attributes: {
        type: mongoose.Schema.Types.Mixed,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    myCollection: {
        type: Map,
        of: String,
    },
    name: {
        type: String,
        required: true
    },
    image:{
        type: Map,
        of: String
    },
    tokenId: {
        type: String,
        required: true
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
    updatedAt: {
        type: Date
    },
    
})

module.exports = mongoose.model('Token', Token)
