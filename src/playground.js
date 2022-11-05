const axios = require("axios");
//import axios from "axios";

const url = "http://localhost:3000/jobs";

const fetchv2 = async () => {
  const response = await axios.get(url);
  console.log(response.data);
};

fetchv2();
