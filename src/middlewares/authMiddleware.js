const jwtPromises = require('../lib/jwt');

exports.auth = async (req, res, next) => {
	const token = req.cookies['auth'];
    res.locals.isAuthenticated = false;

	if (token) {
		try {
			const decodedToken = await jwtPromises.verify(token, process.env.JWT_SECRET);

            req.user = decodedToken;

            res.locals.user = decodedToken;
            res.locals.isAuthenticated = true;

            next();
		} catch (error) {
			res.clearCookie('auth');
			res.redirect('/users/login');
		}
	} else {
		next();
	}
};

exports.isAuth = (req ,res, next) => {
    if (!req.user) {
        return res.redirect('/users/login');
    }

    next();
};
