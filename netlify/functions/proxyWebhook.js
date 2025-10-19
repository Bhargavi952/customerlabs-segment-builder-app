const nodeFetch = require("node-fetch");

// The external URL you want to hit
const EXTERNAL_WEBHOOK_URL =
  "https://webhook.site/17dce9d5-1851-469c-b08b-237cbd7597a6";

exports.handler = async (event, context) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: "Method Not Allowed" }),
    };
  }

  // Handle potential Base64 encoding from Netlify
  let requestBody = event.body;
  if (event.isBase64Encoded) {
    try {
      requestBody = Buffer.from(event.body, "base64").toString("utf8");
    } catch (e) {
      console.error("Base64 decoding failed:", e);
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: "Invalid Base64 encoding in payload.",
        }),
      };
    }
  }

  try {
    // Forward the body to the webhook URL using the renamed 'nodeFetch'
    const response = await nodeFetch(EXTERNAL_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: requestBody, // Use the (potentially) decoded body string
    });

    // Check if the external webhook call succeeded
    if (!response.ok) {
      console.error(`External Webhook failed with status: ${response.status}`);
      const errorText = await response.text();

      return {
        // Return 500 or the external status back to the client
        statusCode: 500,
        body: JSON.stringify({
          message: `External service failed: ${response.status} ${response.statusText}`,
          details: errorText.substring(0, 100),
        }),
      };
    }

    // Success response to send back to your React app
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Segment data sent successfully via proxy.",
      }),
    };
  } catch (err) {
    // Catch network errors, timeouts, etc., from the fetch call
    console.error("Proxy Function Error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: `Internal Server Error: ${err.message}`,
      }),
    };
  }
};
