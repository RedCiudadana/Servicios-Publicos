const EleventyFetch = require("@11ty/eleventy-fetch");
const { AssetCache } = require("@11ty/eleventy-fetch");

// Load .env variables with dotenv
require('dotenv').config();

// Node
// Global variable: process.env

module.exports = async function () {
  const url = `${process.env.API_URI}/sub_categories?page=`;
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
  
  while(true){
    
    let  data  = await EleventyFetch(url+(pagina++), {
        fetchOptions,
        duration: "1h", // save for 1 hour
        type: "json"    // we’ll parse JSON for you
      });

    // Cache item resource to get cached response from `/category/1`
    // when called in related resources.
    data.forEach(element => {
        let asset = new AssetCache(`${url}/${element.id}`);

        if (asset.isCacheValid('1m')) {
        return;
        }

        asset.save(element, 'json');
    });

    if(data.length>0){
      response.push(data)
      
    }
    else{
      break
    }
  }

  const response_final = response.flat()

  return response_final;
};