const fetch = require("node-fetch");
const WEBHOOK_URL = "https://webhook.site/17dce9d5-1851-469c-b08b-237cbd7597a6";

exports.handler = async function (event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    // Forward the body to the webhook URL
    const response = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: event.body,
    });

    const text = await response.text();

    return {
      statusCode: response.status,
      headers: { "Content-Type": "text/plain" },
      body: text,
    };
  } catch (err) {
    return { statusCode: 502, body: `Proxy error: ${err.message}` };
  }
};
const fetch = require("node-fetch");

// The external URL you want to hit
const EXTERNAL_WEBHOOK_URL =
  "https://webhook.site/17dce9d5-1851-469c-b08b-237cbd7597a6";

exports.handler = async (event, context) => {
  // Only process POST requests
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    // Forward the payload from the client to webhook.site
    const response = await fetch(EXTERNAL_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: event.body,
    });

    // Check if the external webhook call succeeded
    if (!response.ok) {
      // Log the error but return a clean status to the client
      console.error(`Webhook failed with status: ${response.status}`);
      return {
        statusCode: response.status,
        body: JSON.stringify({ message: "External webhook call failed" }),
      };
    }

    // Success response to send back to your React app
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Segment data sent successfully via proxy.",
      }),
    };
  } catch (error) {
    console.error("Proxy Function Error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: `Internal Server Error: ${error.message}`,
      }),
    };
  }
};
