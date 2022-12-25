const express = require('express');
const upload = require("../middlewares/uploadFile");

const {
    CreateNewUser,
    UserLogin,
    GetAllUsers,
    FindUserWithId,
    UpdateUser,
    DeleteUser,
    UpdatePassword
} = require('../controllers/user.controller');

const userRouter = express.Router();

userRouter.get('/', GetAllUsers);
userRouter.get('/:id', FindUserWithId);
userRouter.post('/register', CreateNewUser);
userRouter.post('/login', UserLogin);
userRouter.put('/:id', upload.single('avatar'), UpdateUser);
userRouter.patch('/:id', UpdatePassword);
userRouter.delete('/:id', DeleteUser);

module.exports = userRouter;