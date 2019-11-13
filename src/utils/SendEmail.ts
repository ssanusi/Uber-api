import Mailgun from "mailgun-js";

const mailGunClient = new Mailgun({
  apiKey: process.env.MAILGUN_API_KEY || "",
  domain: process.env.MAILGUN_DOMAIN || ""
});

const sendEmail = (subject: string, html: string) => {
  const emailData = {
    from: "sulaiman.sanusi@icloud.com",
    to: "sulaiman.sanusi@icloud.com",
    subject,
    html
  };
  return mailGunClient.messages().send(emailData);
};

export const sendVerificationEmail = (fullName: string, key: string) => {
  const emailSubject = `Hello! ${fullName}, Please verify your Email`;
  const emailBody = `Verify your email by clicking this link <a href="http://localhost.com/verification/${key}">here</a`;
  return sendEmail(emailSubject, emailBody);
};


