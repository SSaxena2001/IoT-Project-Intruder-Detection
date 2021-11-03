import express, { static } from "express";
import { urlencoded } from "body-parser";
import ejs from "ejs";
import axios from "axios";

const app = express();

app.set("view engine", "ejs");
app.use(urlencoded({ extended: true }));
app.use(static("public"));

//Constants here
const API_KEY = "HDOBBOOBNOBQJ7Y2";
const CHANNEL_ID = "1358279";
const MOTION = 1;
const AUTH = 2;
const URL = `https://api.thingspeak.com/channels/${CHANNEL_ID}/fields/${MOTION}.json`;

//Function for fetching data from thingspeak api reference.
const getApiData = async () => {
  const response = await axios.get(URL);
  const data = await JSON.parse(response.data);
  console.log(data);
  return data;
};

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/", (req, res) => {
  res.redirect("/auth");
});

app.get("/auth", (req, res) => {
  const data = getApiData();
  res.render("main", { data: data });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
