const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: {
        type: String, 
        required: true,
    },
    images: [{
        data: Buffer,
        contentType: String
    }],
    rate: {
        type: Number, 
        required: true,
    },
    price: {
        type: Number,
        required: true,
        min: 1
    },
    discount: {
        type: Number, 
        required: true,
    },
    slug: {
        type: String, 
        required: true,
    },
    sold: {
        type: Number, 
        required: true,
    },
    description: {
        type: String,
        required: [true, 'Some information has a big data!']
    },
    details: [{
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref : "Category",
            required: true   
        },
        images: [{
            data: Buffer,
            contentType: String
        }],
        options: [{
        }]
    }]    
}, {
    timestamps: true
});

module.exports = mongoose.model('Product', productSchema);