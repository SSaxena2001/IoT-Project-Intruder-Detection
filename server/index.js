const express = require("express");
const { urlencoded } = require("body-parser");
const ejs = require("ejs");
const axios = require("axios");

const app = express();

app.set("view engine", "ejs");
app.use(urlencoded({ extended: true }));
app.use(express.static("public"));

//Constants here
// const API_KEY = "HDOBBOOBNOBQJ7Y2";
const CHANNEL_ID = "1358279";
const MOTION = 1;
// const AUTH = 2;
const URL = `https://api.thingspeak.com/channels/${CHANNEL_ID}/fields/${MOTION}.json`;

//Function for fetching data from thingSpeak api reference and rendering the main page.
const getApiData = async (res) => {
  const response = await axios.get(URL);
  const data = await response.data;
  console.log(data.feeds);
  res.render("main");
};

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/", (req, res) => {
  res.redirect("/auth");
});

app.get("/auth", async (req, res) => getApiData(res));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
