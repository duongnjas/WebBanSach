const express = require('express');
const upload = require("../middlewares/uploadFile");

const {
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
    FindAddressWithUserId
} = require('../controllers/user.controller');

const userRouter = express.Router();

userRouter.get('/', GetAllUsers);
userRouter.get('/:id', FindUserWithId);
userRouter.post('/register', CreateNewUser);
userRouter.post('/login', UserLogin);
userRouter.put('/:id', UpdateUser);
userRouter.patch('/:id', UpdatePassword);
userRouter.delete('/:id', DeleteUser);

userRouter.get('/address/:userid',FindAddressWithUserId);
userRouter.post('/address/',CreateNewAddress);
userRouter.post('/address/:id',UpdateAddress);
userRouter.delete('/address/:id', DeleteAddress);

module.exports = userRouter;