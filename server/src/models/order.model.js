const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    idUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref : "User",
        required: true,
    },
    feeShip: {
        type: Number,
        required: true,
        min: 1
    },
    totalPrice: {
        type: Number,
        required: true,
        min: 1
    },
    type: {
        type: String,
        required: true,
    },
    payment: {
        type: String,
        required: true,
    },
    shipping: {
        type: String,
        required: true,
    },
    address:{
        id: {
            type: mongoose.Schema.Types.ObjectId, 
            required: true, 
        },
        name: {
            type: String, 
            required: true,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref : "User",
            required: true,
        },
        phone: {
            type: String, 
            required: true,
        },
        province: {
            type: String, 
            required: true,
        },
        updatedAt: {
            type: Date,
            required: true,
        },
        ward: {
            type: String, 
            required: true,
        },
        createdAt: {
            type: Date,
            required: true,
        },
        details: {
            type: String, 
            required: true,
        },
        district: {
            type: String, 
            required: true,
        }
    },
    products:[{
        choose: {
            type: Boolean,
            required: true,
            default: false
        },
        discount: {
            type: Number,
            required: false,
        },
        id: {
            type: mongoose.Schema.Types.ObjectId,
            required: false,
        },
        name: {
            type: String,
            required: false,
        },
        slug: {
            type: String,
            required: false,
        },
        images: {
            type: String,
            required: false,
        },
        price: {
            type: Number,
            required: true,
            min: 1
        },
        quantity: {
            type: Number,
            required: true,
            min: 1
        }
    }]
        
},
{
    timestamps: true,
});

module.exports = mongoose.model('Order', orderSchema);