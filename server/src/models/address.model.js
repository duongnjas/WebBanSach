const mongoose = require('mongoose');

const addressSchema = mongoose.Schema({
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
    district: {
        type: String, 
        required: true,
    },
    ward: {
        type: String, 
        required: true,
    },
    details: {
        type: String, 
        required: true,
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('Address', addressSchema);