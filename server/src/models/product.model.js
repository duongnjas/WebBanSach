const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: {
        type: String, 
        required: true,
    },
    images: [{
        type: String,
        required: true,
    }],
    rate: {
        type: Number, 
        required: true,
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
        required: true,
        min: 0
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
            type: String,
            required: true
        }],
        options: [{
            id: {
                type: mongoose.Schema.Types.ObjectId,
                required: true
            },
            name: {
                type: String,
                required: true
            },
            values: [{
                id: {
                    type: mongoose.Schema.Types.ObjectId,
                    required: true
                },
                idType: {
                    type: mongoose.Schema.Types.ObjectId,
                    required: true
                },
                value: {
                    type: String,
                    required: true
                }
            }]
        }]
    }],
    specifications: [{
        id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        value: {
            type: String,
            required: true
        }
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model('Product', productSchema);