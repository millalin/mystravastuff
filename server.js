const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());

//Strava cred

let clientID = '';
let clientSecret = "";

const refreshToken = "";

app.use("/data", (req, res) => {

  const callActivities = `https://www.strava.com/api/v3/athlete/activities?per_page=100&page=1`;

  getAccessToken().then((response) => {
    axios
    .get(callActivities, {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + response.access_token,
          Accept: 'application/json',
        },
      })
    .then((response) => {
      console.log(`Status: ${response.status}`);
      console.log("Body: ", response.data);
      res.send(JSON.stringify(response.data));
    })
    .catch((err) => {
      console.error(err);
    })
  }
  )

});

async function getAccessToken() {
    const callRefresh = `https://www.strava.com/oauth/token?client_id=${clientID}&client_secret=${clientSecret}&refresh_token=${refreshToken}&grant_type=refresh_token`;
    const res = await axios.post(callRefresh).catch((err) => {console.log(err)})
    return res.data
} 

app.listen(8080, () => console.log("API is running on localhost:8080/data "));
