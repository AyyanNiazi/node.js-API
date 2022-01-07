const mongoose = require('mongoose')

const collections = mongoose.Schema({
    createdAt: { type: Date, default: Date.now },
    address: { type: String, required: true },
    avatar: { type: String, required: true },
    banner: { 
            large: { type: String, required: true },
            small: { type: String}
     },
    description: { type: String, required: true },
    name: { type: String, required: true },
    owner: { type: String, required: true },
    symbol: { type: String, required: true },
    symbol: { type: String, required: true },
    totalSupply: { type: String, required: true },
    updatedAt: { type: Date, default: Date.now },
    verified: { type: Boolean, default: false },
    
})

module.exports = mongoose.model('Collections', collections)