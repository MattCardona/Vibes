const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req,res) => {
  res.send("This is the home route");
})

app.listen(port, () => {
  console.log(`The Vibes server is running on port ${port}`);
});