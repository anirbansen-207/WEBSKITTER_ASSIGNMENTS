import nodemailer from "nodemailer";

export const sendEmail = async (
  email,
  subject,
  message,
) => {
  try {
    const transporter =
      nodemailer.createTransport({
        service: "gmail",

        auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD,
        },
      });

    const mailOptions = {
      from: process.env.EMAIL_USERNAME,
      to: email,
      subject,
      text: message,
    };

    await transporter.sendMail(mailOptions);

    console.log("Email sent successfully");
  } catch (error) {
    console.error(
      "Error sending email:",
      error,
    );

    // Do not silently swallow the error.
    // The calling service must know that
    // email delivery failed.
    throw error;
  }
};