import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import mjml2html from 'mjml';

dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'Mailgun',
    secure: true,
    port: 465,
    auth: {
        user: process.env.MAILGUN_USERNAME,
        pass: process.env.MAILGUN_PASSWORD,
    },
});

export const sendOtpEmail = async ({ to, name, otp }) => {
    try {
        const templatePath = path.resolve('src/templates/otpTemplate.mjml');
        if (!fs.existsSync(templatePath)) {
            throw new Error(`Template file not found at path: ${templatePath}`);
        }

        const mjmlContent = fs.readFileSync(templatePath, 'utf8');
        const filledTemplate = mjmlContent
            .replace('{name}', name)
            .replace('{otp}', otp);

        const { html, errors } = mjml2html(filledTemplate);
        if (errors && errors.length > 0) {
            throw new Error(`MJML conversion error: ${JSON.stringify(errors)}`);
        }

        const mailOptions = {
            from: 'noreply@example.com',
            to,
            subject: 'Your OTP Code',
            html,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log(`OTP email sent to ${to}: ${info.response}`);
        return { success: true, message: 'OTP email sent' };
    } catch (error) {
        console.error(`Failed to send OTP email to ${to}:`, error.message);
        return { success: false, error: error.message };
    }
};