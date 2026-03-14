const twilio = require("twilio");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const verifySid = process.env.TWILIO_VERIFY_SID;

console.log("Account SID:", accountSid);
console.log("Verify SID:", verifySid);

if (!accountSid || !authToken || !verifySid) {
  console.error("Missing Twilio credentials in .env");
  process.exit(1);
}

const client = twilio(accountSid, authToken);

async function checkService() {
  try {
    console.log("Fetching Verify Service...");
    const service = await client.verify.v2.services(verifySid).fetch();
    console.log("Service found:", service.friendlyName);
    console.log("Status: OK");
  } catch (error) {
    console.error("Twilio diagnostic error:", error.message);
    if (error.status === 404) {
      console.error("The Verify Service SID was not found. Please check if it exists in your Twilio account.");
    }
  }
}

checkService();
