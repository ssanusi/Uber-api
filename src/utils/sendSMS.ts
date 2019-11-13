import * as api from "clicksend/api";

const smsMessage = new api.SmsMessage();
const smsApi = new api.SMSApi(
  process.env.CLICKSEND_USERNAME || "",
  process.env.CLICKSEND_API_KEY || ""
);
const smsCollection = new api.SmsMessageCollection();

const sendSMS = (from: string, to: string, body: string) => {
  const smsMessages = { ...smsMessage, from, to, body };
  smsCollection.messages = [smsMessages];
  smsApi
    .smsSendPost(smsCollection)
    .then(function(response) {
		console.log(response.body);
		return response
    })
    .catch(function(err) {
		console.error(err.body);
		return err
    });
};

export const sendVerificationSMS = (to: string, key: string) => {
	const body = `Please verify your Phone Number wit the key ${key}`
	const from = process.env.PHONE || ""
	return sendSMS(from, to, body )

}

