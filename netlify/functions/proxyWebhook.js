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
