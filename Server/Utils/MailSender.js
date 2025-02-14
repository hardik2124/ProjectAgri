const nodeMailer = require("nodemailer");
require("dotenv").config();
const mailSender = async (email, title, body) => {
    try {
        const Transport = nodeMailer.createTransport({
            host: process.env.MAIL_HOST,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
            debug: true,
            logger: true,
        });

        let info = await Transport.sendMail({
            from: `AgriAura Verification`,
            to: `${email}`,
            subject: `${title}`,
            html: `${body}`,
        });
        console.log(info);
        return info;
    } catch (e) {
        console.log(e.message);
        return {
            status: 500,
            success: false,
            message: "Error while sending email",
        };
    }
};


module.exports = mailSender;
