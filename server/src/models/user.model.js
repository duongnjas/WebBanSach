const mongoose = require('mongoose');

/**
 * @link https://stackoverflow.com/questions/14588032/mongoose-password-hashing
 */
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

const userSchema = mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    birth_day: {
        type: Date,
        //required: true
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other'],
        required: false
    },
    img: {
        data: Buffer,
        contentType: String,
        required: false
    },
    email: {
        type: String,
        required: false
    },
    phone: {
        type: String,
        unique: true,
        required: [true, 'You need to provide your phone!'],
        minLength: [10, 'Your phone is invalid']
    },
    password: {
        type: String,
        required: true,
        minLength: [8, 'Your password length must larger than 8 characters!']
    },
    status: {
        type: Boolean,
        required: true,
        default: false
    },
    active: {
        type: Boolean,
        required: true,
        default: false
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    },
    facebookAuth: {
        type: String,
        required: false
    },
    googleAuth: {
        type: String,
        required: false
    },
    accessToken: {
        type: String,
        required: false
    },
    refreshToken: {
        type: String,
        required: false
    }
}, {
    timestamps: true
});

userSchema.pre('save', function(next) {
    var user = this;
    if (!user.isModified('password')) return next();

    bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
        if(err) return next(err);

        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) return next(err);
            user.password = hash;
            next();
        })
    })
});

userSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);