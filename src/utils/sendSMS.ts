import Twilio from "twilio";

const twilioClient = Twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

const sendSMS = (to: string, body: string) => {
	return twilioClient.messages.create({
		to,
		body,
		from: process.env.TWILIO_PHONE
	  });
};

export const sendVerificationSMS = (to: string, key: string) => {
	const body = `Please verify your Phone Number wit the key ${key}`
	return sendSMS(to, body )
}

