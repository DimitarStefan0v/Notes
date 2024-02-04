const mongoose = require('mongoose');

exports.extractErrorMessages = (err) => {
	if (err instanceof mongoose.MongooseError) {
		if (err.errors) {
			return Object.values(err.errors).map((x) => x.message);
		} else {
            return [err.message];
		}
	} else {
		return [err.message];
	}
};
