const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
        choose: {
            type: Boolean,
            required: true,
            default: false
        },
        option: [{
            name: {
                type: String,
                required: true,
            },
            value: {
                type: String,
                required: true,
            }
        }],
        name: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        productId: {
            type: String,
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
},
{
    timestamps: true,
}
)

module.exports = mongoose.model('Order', orderSchema);