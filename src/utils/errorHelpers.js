const mongoose = require('mongoose');

exports.extractErrorMessages = (err) => {
    if (err instanceof mongoose.MongooseError) {
        return Object.values(err.errors).map(x => x.message);
    } else if (err instanceof Error) {
        return [err.message];
    }
};