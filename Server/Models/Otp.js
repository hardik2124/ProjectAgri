const mongoose = require('mongoose');
const mailSender = require('../Utils/MailSender');

const OTPSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
	},
	otp: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
		expires: 60 * 5, // The document will be automatically deleted after 5 minutes of its creation time
	},
});



// exports.sendVerificationEmail = async (email, otp) => {
//     try {
//         const mailResponse = await mailSender(
//             email,
//             "Verification Email",
//             emailTemplate(otp) // Ensure `emailTemplate` generates a valid email body
//         );
//         console.log("Email sent successfully: ", mailResponse.response);
//     } catch (error) {
//         console.error("Error occurred while sending email: ", error);
//         throw error;
//     }
// };


// OTPSchema.pre("save",async function(next) {
// 	await sendVerificationEmail(this.email , this.otp);
// 	next(); 
// });

module.exports = mongoose.model('otp', OTPSchema);