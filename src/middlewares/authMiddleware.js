const jwtPromises = require('../lib/jwt');

exports.auth = async (req, res, next) => {
	const token = req.cookies['auth'];

	if (token) {
		try {
			const user = await jwtPromises.verify(token, process.env.JWT_SECRET);

            req.user = user;
            
            next();
		} catch (error) {
			res.clearCookie('auth');

			res.redirect('/users/login');
		}
	} else {
		next();
	}
};
