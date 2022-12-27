const randToken = require('rand-token');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const promisify = require('util').promisify;
const sign = promisify(jwt.sign).bind(jwt);
const verify = promisify(jwt.verify).bind(jwt);

const User = require('../models/user.model');
const REFRESH_TOKEN_SIZE = 100
const SALT_ROUNDS = 10

async function updateRefreshToken (username, refreshToken){
	try {
		await User
			.findOne({username: username})
			.assign({refreshToken: refreshToken})
			.write();
		return true;
	} catch {
		return false;
	}
};

async function generateToken (payload, secretSignature, tokenLife) {
	try {
		return await sign(
			{
				payload,
			},
			secretSignature,
			{
				algorithm: 'HS256',
				expiresIn: tokenLife,
			},
		);
	} catch (error) {
		console.log(`Error in generate access token:  + ${error}`);
		return null;
	}
};

async function verifyToken (token, secretKey) {
	try {
		return await verify(token, secretKey);
	} catch (error) {
		console.log(`Error in verify access token:  + ${error}`);
		return null;
	}
};

async function decodeToken (token, secretKey) {
	try {
		return await verify(token, secretKey, {
			ignoreExpiration: true,
		});
	} catch (error) {
		console.log(`Error in decode access token: ${error}`);
		return null;
	}
};

async function register(req, res) {
	const phone = req.body.phone;
	const user = await User.findOne({phone : phone});
	if (user) res.status(409).send('Tên tài khoản đã tồn tại.');
	else {
		const hashPassword = await bcrypt.hashSync(req.body.password, SALT_ROUNDS);
		const newUser = {
			phone: phone,
			password: hashPassword,
		};
		const createUser = await User.create(newUser);
		if (!createUser) {
			return res
				.status(400)
				.send('Có lỗi trong quá trình tạo tài khoản, vui lòng thử lại.');
		}
		return res.send({
			phone,
		});
	}
};

async function login(req, res) {
	const { phone, password } = req.body;
	const user = await User.findOne({ phone });
	if (!user) {
		return res.status(401).send('Tên đăng nhập không tồn tại.');
	}

	const isPasswordValid = await bcrypt.compare(password, user.password);
	if (!isPasswordValid) {
		return res.status(401).send('Mật khẩu không chính xác.');
	}

	const accessTokenLife =
		process.env.ACCESS_TOKEN_LIFE;
	const accessTokenSecret =
		process.env.ACCESS_TOKEN_SECRET;

	const dataForAccessToken = {
		user_id: user._id,
		roleNames: user.roleNames,
		rolePermissions: [
			"user:read",
    		"user:write"
		],
	};
	const accessToken = await generateToken(
		dataForAccessToken,
		accessTokenSecret,
		accessTokenLife,
	);
	if (!accessToken) {
		return res
			.status(401)
			.send('Đăng nhập không thành công, vui lòng thử lại.');
	}

	let refreshToken = randToken.generate(REFRESH_TOKEN_SIZE);
	if (!user.refreshToken) {
		await updateRefreshToken(user.phone, refreshToken);
	} else {
		refreshToken = user.refreshToken;
	}

	return res.status(201).json({
        success: true,
        status: 200,
		message: 'Login successful',
		accessToken,
        data: user,
		refreshToken
	});
};

async function refreshToken (req, res) {
	const accessTokenFromHeader = req.headers.x_authorization;
	if (!accessTokenFromHeader) {
		return res.status(400).send('Không tìm thấy access token.');
	}

	const refreshTokenFromBody = req.body.refreshToken;
	if (!refreshTokenFromBody) {
		return res.status(400).send('Không tìm thấy refresh token.');
	}

	const accessTokenSecret =
		process.env.ACCESS_TOKEN_SECRET;
	const accessTokenLife =
		process.env.ACCESS_TOKEN_LIFE;

	const decoded = await decodeToken(
		accessTokenFromHeader,
		accessTokenSecret,
	);
	if (!decoded) {
		return res.status(400).send('Access token không hợp lệ.');
	}

	const phone = decoded.payload.phone;

	const user = await User.findOne({phone : phone});
	if (!user) {
		return res.status(401).send('User không tồn tại.');
	}

	if (refreshTokenFromBody !== user.refreshToken) {
		return res.status(400).send('Refresh token không hợp lệ.');
	}

	const dataForAccessToken = {
		phone,
	};

	const accessToken = await generateToken(
		dataForAccessToken,
		accessTokenSecret,
		accessTokenLife
	);
	if (!accessToken) {
		return res
			.status(400)
			.send('Tạo access token không thành công, vui lòng thử lại.');
	}
	return res.json({
		accessToken,
	});
};
module.exports = {
    generateToken,
    verifyToken,
    decodeToken,
    register,
    login,
    refreshToken
}