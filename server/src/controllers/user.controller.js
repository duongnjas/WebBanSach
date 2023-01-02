const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require('fs');
const path = require('path');

const User = require("../models/user.model");
const Address = require("../models/address.model");
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
  const phone = req.body.phone;
  const user = await User.findOne({ phone: phone });
  if (user) res.status(501).send("Tên tài khoản đã tồn tại.");
  else {
    const newUser = {
        fullName: req.body.fullName,
        birth_day: req.body.birth_day,
        gender: req.body.gender,
        email: req.body.email,
        phone: req.body.phone,
        password: req.body.password,
        roleNames: req.body.roleNames,
    }    
    const user = await User.create(newUser);
    if(user) {
        return res.status(201).json(user);
    }
    return res.status(501).json({ error: "Invalid data!" });
  }
    
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
        fullName: req.body.name,
        birth_day: req.body.dob,
        gender: req.body.gender,
        email: req.body.email,
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

async function CreateNewAddress (req, res) {
    const newAddress = {
        name: req.body.name,
        userId: req.body.userId,
        phone: req.body.phone,
        province: req.body.province,
        district: req.body.district,
        ward: req.body.ward,
        details: req.body.details,
    }    
    const address = await Address.create(newAddress);
    if(address) {
        return res.status(201).json(address);
    }
    return res.status(501).json({ error: "Invalid data!" });
}

async function UpdateAddress (req, res) {
    const addressId = req.params.id;
    const oldAddress = await Address.findOne( { _id: addressId } ) 
    if(!oldAddress) {
        return res.status(404).json({ error: "Address not found!"});
    }

    const newAddress = {
        name: req.body.name,
        userId: req.body.userId,
        phone: req.body.phone,
        province: req.body.province,
        district: req.body.district,
        ward: req.body.ward,
        details: req.body.details
    }

    const result = await Address.updateOne({ _id: addressId }, newAddress);
    if(result) {
        return res.status(200).json(result);
    }
    return res.status(501).json({ error: "Failed to update!" });
}

async function DeleteAddress (req, res) {
    const addressId = req.params.id;
    const oldAddress = await Address.findOne( { _id: addressId } );
    
    if(!oldAddress) {
        return res.status(404).json({ error: "Address not found!"});
    }

    const result = await Address.remove({ _id: addressId });
    if(result) {
        return res.status(200).json(result);
    }
    return res.status(501).json({ error: "Failed to delete!" });
}

async function FindAddressWithUserId (req, res) {
    const userId = req.params.userid;
    const address = await Address.find( { userId: userId } )
    if(address) {
        return res.status(200).json(address);
    }
    return res.status(404).json({ error: 'Cannot find address with userid=' + userId });
}


module.exports = {
    CreateNewUser,
    UserLogin,
    GetAllUsers,
    FindUserWithId,
    UpdateUser,
    DeleteUser,
    UpdatePassword,
    CreateNewAddress,
    UpdateAddress,
    DeleteAddress,
    FindAddressWithUserId,
}

