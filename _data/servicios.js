const axios = require("axios");

module.exports = async () => {
  const { data } = await axios.get("http://127.0.0.1:8000/api/public_services?page=1");

  return data;
};