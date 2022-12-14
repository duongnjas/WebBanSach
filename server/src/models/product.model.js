const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: {
        type: String, 
        required: true,
    },
    images: {
        type: String,
        required: true,
    },
    rate: {
        type: Number, 
        required: false,
        min: 0
    },
    price: {
        type: Number,
        required: true,
        min: 1
    },
    discount: {
        type: Number, 
        required: true,
        min: 0
    },
    slug: {
        type: String, 
        required: true,
    },
    sold: {
        type: Number, 
        required: false,
        min: 0,
    },
    details: {
        categoryId: {
            type: mongoose.Schema.Types.ObjectId,
            ref : "Category",
            required: true 
        },
        images: [{
            type: String,
            required: true
        }],
        options: {
            name: {
                type: String,
                required: false
            },
            values: {
                type: String,
                required: false
            }
        },
        description: {
            type: String,
            required: true
        }
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('Product', productSchema);