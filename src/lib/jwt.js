const { promisify } = require('util');

const jsonwebtoken = require('jsonwebtoken');

// const jwt = {
// 	sign: promisify(jsonwebtoken.sign),
// 	verify: promisify(jsonwebtoken.verify),
// };

const sign = (payload, secret, options) => {
	const promise = new Promise((resolve, reject) => {
		jsonwebtoken.sign(payload, secret, options, (err, result) => {
			if (err) {
				reject(err);
			}

			resolve(result);
		});
	});

	return promise;
};

const verify = (token, secret) => {
    const promise = new Promise((resolve, reject) => {
        jsonwebtoken.verify(token, secret, (err, result) => {
            if (err) {
                reject(err);
            }

            resolve(result);
        });
    });

    return promise;
};

const jwtPromises = {
    sign,
    verify,
};

module.exports = jwtPromises;
