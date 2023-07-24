const nodemailer = require('nodemailer');
const nodemailerSendgrid = require('nodemailer-sendgrid');

const transporter = nodemailer.createTransport(nodemailerSendgrid({ 
	apiKey: process.env.SENDGRID_API_KEY
}));

const send = (info) =>{
	return new Promise(async(resolve,reject) =>{
		try {
			let result = await transporter.sendMail(info);
			resolve(result)
		} catch(error) {
			reject(error)
		}
	})
}


const emailProcessor = ({to,verification,type}) =>{
	let info = "";
	switch (type) {
		case "email-verification":
			info = {
				from:process.env.NODEMAILER_USER,
				to:to,
				subject:'Rhythm-Deck Account verification',
				text:'Please Click on the link to verify your account',
				html:require('../utils/emailTemplate')({
					verification:`${process.env.CLIENT_BASE_URL}/verifyAccount?token=${verification}&email=${to}`,
					mailType:'verify account',
					maildesc:'An request has been received from your mail to activate Rhythm-Deck account if not you please discard',
					btntext:'Verify Account'
				})
			};
			send(info);
			break;
		case 'forgot-password':
			info={
				from:process.env.NODEMAILER_USER,
				to:to,
				subject:'Rhythm-Deck Password Reset',
				text:'Copy the otp to reset your password',
				html:require('../utils/emailTemplate')({
					verification:`${process.env.CLIENT_BASE_URL}/forgotpassword?email=${to}&otp=${verification}&success=true`,
					mailType:'reset password',
					maildesc:'An request has been received from your mail to reset Rhythm-Deck account password if not you please discard',
					btntext:'Reset Password'
				})
			};
			send(info);
			break;
		default:
			break;
	}
}


module.exports = {emailProcessor};