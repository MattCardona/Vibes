require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_DB, {useNewUrlParser: true});
const { User } = require('./models/user');


const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());

app.get("/", (req,res) => {
  res.send("This is the home route");
})


//======================
// User routes
//======================

app.post('/api/users/register', (req, res) => {
  res.status(200).send("You hit the end point")
})


app.listen(port, () => {
  console.log(`The Vibes server is running on port ${port}`);
});