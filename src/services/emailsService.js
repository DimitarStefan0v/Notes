const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');

const transporter = nodemailer.createTransport(
	sendgridTransport({
		auth: {
			api_key: process.env.SENDGRID_API_KEY,
		},
	})
);

exports.send = async (to, from, content) => {
	return transporter.sendMail({
		to,
		from,
		subject: 'Email from the contacts form in Notes App',
		html: `<h1>${content}</h1>`,
	});
};
