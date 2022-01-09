const mongoose = require('mongoose')

const distribution = mongoose.Schema({
    address: {
        type: mongoose.Schema.Types.String,
        ref: 'Collections',
        required: true
    },
    distribution: {
       type: Map,
       of: Map
   }
})

module.exports = mongoose.model('Distribution', distribution)
