const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require('fs');
const path = require('path');

const User = require("../models/user.model");
const auth = require("../middlewares/auth");

require("dotenv").config();

async function GetAllUsers (req, res) {
    const users = await User.find({}, { password: 0 })
    if(users.length > 0) {
        return res.status(200).json(users);
    }
    return res.status(404).json({ error: "Not found any user!" });
}

async function FindUserWithId (req, res) {
    const userId = req.params.id;
    const user = await User.findOne( { _id: userId }, { password: 0 } )
    if(user) {
        return res.status(200).json(user);
    }
    return res.status(404).json({ error: 'Cannot find user with id=' + userId });
}

async function CreateNewUser (req, res) {
    const newUser = {
        name: req.body.name,
        dob: req.body.dob,
        gender: req.body.gender,
        address: {
            street: req.body.address.street,
            town: req.body.address.town,
            province: req.body.address.province
        },
        email: req.body.email,
        phone: req.body.phone,
        password: req.body.password,
        isAdmin: req.body.isAdmin,
    }    
    
    const user = await User.create(newUser);
    const token = jwt.sign(
        { user_id: user._id, phone: user.phone },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );
      // save user token
      user.token = token;
    if(user) {
        return res.status(201).json(user);
    }
    return res.status(501).json({ error: "Invalid data!" });
}

async function UserLogin (req, res) {
    const { phone, password } = req.body;

    const user = await User.findOne({ phone });

    if (user && (await bcrypt.compare(password, user.password))) {
        // Create token
        const token = jwt.sign(
          { user_id: user._id, phone: user.phone },
          process.env.TOKEN_KEY,
          {
            expiresIn: "2h",
          }
        );
        user.token = token;
    }
    if(user) {
        return res.status(200).json(user);
    }
    return res.status(404).json({ error: "Data invalid!" });
}
async function UpdateUser (req, res) {
    const userId = req.params.id;
    const oldUser = await User.findOne( { _id: userId }, { password: 0 } ) 
    if(!oldUser) {
        return res.status(404).json({ error: "User not found!"});
    }

    const newUser = {
        name: req.body.name,
        dob: req.body.dob,
        gender: req.body.gender,
        address: {
            street: req.body.address.street,
            town: req.body.address.town,
            province: req.body.address.province
        },
        email: req.body.email,
        phone: req.body.phone,
        isAdmin: req.body.isAdmin
    }

    try {
        newUser.avatar = {
            data: fs.readFileSync(path.join(__dirname, '..', '..', '/uploads/' + req.file.filename)),
            contentType: 'image/png'  
        }
    }  
    catch(err) {
        console.log(err);
    }  

    const result = await User.updateOne({ _id: userId }, newUser);
    if(result) {
        return res.status(200).json(result);
    }
    return res.status(501).json({ error: "Failed to update!" });
}

async function findUserWithIdAndPassword(userId, password) {
    return await User.findOne({ _id: userId })
        .then(async (user) => {          
            return await user.comparePassword(password);
        })
        .catch((err) => false);
}

async function UpdatePassword (req, res) {
    const userId = req.params.id;
    const oldUser = await User.findOne( { _id: userId }, { password: 0 } );
    
    if(!oldUser) {
        return res.status(404).json({ error: "User not found!"});
    }

    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;

    const correctPassword = await findUserWithIdAndPassword(userId, oldPassword);
    if(!correctPassword)
        return null;

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(newPassword, salt);

    const result = await User.updateOne({ _id: userId },{ password: hash });

    if(result) {
        return res.status(200).json(result);
    }
    return res.status(501).json({ error: "Failed to update password!" });
}

async function DeleteUser (req, res) {
    const userId = req.params.id;
    const oldUser = await User.findOne( { _id: userId }, { password: 0 } );
    
    if(!oldUser) {
        return res.status(404).json({ error: "User not found!"});
    }

    const result = await User.remove({ _id: userId });
    if(result) {
        return res.status(200).json(result);
    }
    return res.status(501).json({ error: "Failed to delete!" });
}

module.exports = {
    CreateNewUser,
    UserLogin,
    GetAllUsers,
    FindUserWithId,
    UpdateUser,
    DeleteUser,
    UpdatePassword
}

