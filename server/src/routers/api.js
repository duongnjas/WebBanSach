const express = require('express');

// const billRouter = require('./bill.route');
// const blogRouter = require('./blog.route');
// const categoryRouter = require('./category.route');
// const chatRouter = require('./chat.route');
// const commentRouter = require('./comment.route');
// const messageRouter = require('./message.route');
// const notificationRouter = require('./notification.route');
const productRouter = require('./product.route');
const userRouter = require('./user.route');
const authRouter = require('./auth.route');
const orderRouter = require('./order.route');

const api = express.Router();

// api.use('/bills', billRouter);
// api.use('/blogs', blogRouter);
// api.use('/categories', categoryRouter);
// api.use('/chats', chatRouter);
// api.use('/comments', commentRouter);
// api.use('/messages', messageRouter);
// api.use('/notifications', notificationRouter);
api.use('/products', productRouter);
api.use('/users', userRouter);
api.use('/auth',authRouter);
api.use('/orders',orderRouter);

module.exports = api;