const userModel = require('../models/user.model');

const authController = require('../controllers/auth.controller');

exports.isAuth = async (req, res, next) => {
	// Lấy access token từ header
	const accessTokenFromHeader = req.headers.x_authorization;
	if (!accessTokenFromHeader) {
		return res.status(401).send('Không tìm thấy access token!');
	}

	const accessTokenSecret =
		process.env.ACCESS_TOKEN_SECRET;

	const verified = await authController.verifyToken(
		accessTokenFromHeader,
		accessTokenSecret,
	);
	if (!verified) {
		return res
			.status(401)
			.send('Bạn không có quyền truy cập vào tính năng này!');
	}

	const user = await userModel.getUser(verified.payload.username);
	req.user = user;

	return next();
};