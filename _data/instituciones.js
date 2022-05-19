const axios = require("axios");

module.exports = async () => {
  const { data } = await axios.get("http://127.0.0.1:8000/api/institutions?page=1");

  return data;
};