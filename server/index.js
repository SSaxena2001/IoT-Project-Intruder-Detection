const express = require("express");
const { urlencoded } = require("body-parser");
const alert = require("alert");
const axios = require("axios");
const ejs = require("ejs");

const app = express();

app.set("view engine", "ejs");
app.use(urlencoded({ extended: true }));
app.use(express.static("public"));

//Constants here
const API_KEY = "HDOBBOOBNOBQJ7Y2";
const CHANNEL_ID = 1358279;
const MOTION = 1;
// const AUTH = 2;
const URL = `https://api.thingspeak.com/channels/${CHANNEL_ID}/fields/${MOTION}.json?results=5`;

const validation = (email, pass) => {
  const emailregex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const passregex = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
  );
  if (email.match(emailregex)) {
    if (pass.match(passregex)) {
      return "Success";
    } else {
      return "Wrong Password, Try Again!";
    }
  } else {
    return "Wrong Password or Email, Try Again!";
  }
};

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/", (req, res) => {
  const email = req.body.user;
  const pass = req.body.pass;
  const validate = validation(email, pass);
  if (validate === "Success") {
    res.redirect("/auth");
  } else {
    console.log("Error: " + validate);
    alert("Error: " + validate);
    res.redirect("/");
  }
});

var data;

const getFieldData = async () => {
  const response = await axios.get(URL);
  data = response.data;
  console.log(data);
};

app.get("/auth", (req, res) => {
  getFieldData().then(() => {
    res.render("main", { motion: data });
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
