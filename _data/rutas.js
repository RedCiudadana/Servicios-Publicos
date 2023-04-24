const EleventyFetch = require("@11ty/eleventy-fetch");
const { AssetCache } = require("@11ty/eleventy-fetch");

// Load .env variables with dotenv
require('dotenv').config();

// Node
// Global variable: process.env

module.exports = async function () {
  const url = `${process.env.API_URI_NODES}/node/api/routes/1/tree`;
  const buff = Buffer.from(`${process.env.API_USER}:${process.env.API_PASSWORD}`, 'utf-8');
  const credentials = buff.toString('base64');

  const fetchOptions = {
    headers: {
      'Authorization': `Basic ${credentials}`
    }
  };

  /* This returns a promise */
  const response = []

  let pagina = 1;



  let data = await EleventyFetch(url, {
    fetchOptions,
    duration: "1h", // save for 1 hour
    type: "json"    // we’ll parse JSON for you
  });

  response.push(data)


  const response_final = response.flat()

  return response_final;
};