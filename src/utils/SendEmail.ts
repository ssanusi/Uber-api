import SENDGRID from '@sendgrid/mail';

SENDGRID.setApiKey(process.env.SENDGRID_API_KEY || "")


const sendEmail = (to:string, subject: string, text: string) => {
  const msg = {
    from: "no-reply@uberclone.com",
    to,
    subject,
    text
  };
  return SENDGRID.send(msg);;
};

export const sendVerificationEmail = (to:string, fullName: string, key: string) => {
  const emailSubject = `Hello! ${fullName}, Please verify your Email`;
  const emailBody = `Verify your email by clicking this link ${key}`;
  return sendEmail(to,emailSubject, emailBody);
};




