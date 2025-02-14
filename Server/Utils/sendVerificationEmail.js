const mailSender = require('../Utils/MailSender');
const otpTemplate = require("../Templates/EmailVerificationTemplate");

const sendVerificationEmail = async (email, otp) => {
    try {
        const mailResponse = await mailSender(
            email,
            "Verification Email",
            otpTemplate(otp) // Ensure `emailTemplate` generates a valid email body
        );
        console.log("Email sent successfully: ", mailResponse.response);
    } catch (error) {
        console.error("Error occurred while sending email: ", error);
        throw error;
    }
};

module.exports = sendVerificationEmail;