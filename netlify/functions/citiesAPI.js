const axios = require("axios");

exports.handler = async function (event, context) {
  try {
    const response = await axios.get("http://44.228.182.177:9001/cities");
    return {
      statusCode: 200,
      body: JSON.stringify(response.data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed fetching data" }),
    };
  }
};
