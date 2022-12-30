const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    slug: {
        type: String,
        required: true,
        maxLength: 100
    },
    name: {
        type: String, 
        require: true,
        maxLength: 100
    }
});

module.exports = mongoose.model('Category', categorySchema);