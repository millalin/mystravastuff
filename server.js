const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();
app.use(cors());

app.use("/data", (req, res) => {
  const callActivities = `https://www.strava.com/api/v3/athlete/activities?per_page=100&page=1`;

  getAccessToken().then((response) => {
    axios
      .get(callActivities, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + response.access_token,
          Accept: "application/json",
        },
      })
      .then((response) => {
        console.log(`Status: ${response.status}`);
        res.send(JSON.stringify(response.data));
      })
      .catch((err) => {
        console.error(err);
      });
  });
});

async function getAccessToken() {
  let clientID = process.env.CLIENT_ID;
  let clientSecret = process.env.CLIENT_SECRET;
  const refreshToken = process.env.REFRESHTOKEN;
  const callRefresh = `https://www.strava.com/oauth/token?client_id=${clientID}&client_secret=${clientSecret}&refresh_token=${refreshToken}&grant_type=refresh_token`;
  const res = await axios.post(callRefresh).catch((err) => {
    console.log(err);
  });
  return res.data;
}

app.listen(8080, () => console.log("API is running on localhost:8080/data "));
