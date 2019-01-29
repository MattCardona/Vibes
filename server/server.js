require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_DB, {useNewUrlParser: true});
const { User } = require('./models/user');
const { Brand } = require('./models/brand'); 

const { auth } = require('./middleware/auth');
const { admin } = require('./middleware/admin');

const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());

app.get("/", (req,res) => {
  res.send("This is the home route");
})

//======================
//     Brand routes
//======================

app.post('/api/product/brand', auth, admin, (req, res) => {
  new Brand(req.body).save()
  .then(doc => {
    res.status(200).json({
      success: true,
      brand: doc
    });
  })
  .catch(err => {
    return res.json({
      success: false,
      err
    });
  });
});



//======================
//     User routes
//======================

app.get('/api/users/auth', auth, (req, res) => {
  const { email, name, lastname, role, cart, history } = req.user;
  res.status(200).json({
    isAdmin: role === 0 ? false : true,
    isAuth: true,
    email,
    name,
    lastname,
    role,
    cart,
    history
  });
});


app.post('/api/users/register', (req, res) => {
  new User(req.body).save()
  .then(user => {
    res.status(200).json({
      success: true
    });
  })
  .catch(err => {
    res.json({
      success: false,
      err
    });
  });
});

app.post('/api/users/login', (req, res) => {
  const { password, email } = req.body;

  User.findOne({'email': email}).then(user => {
    if(!user){
      return res.json({
        loginSuccess: false,
        message: 'Auth failed, Email not found'
      });
    }
    
    user.comparePassword(password, (err, isMatch) => {
      if(!isMatch){
        return res.json({
          loginSuccess: false,
          message: 'Wrong password'
        });
      }

      user.generateToken((err, user) => {
        if(err){
          return res.status(400).send(err);
        }
        res.cookie('w_auth', user.token).status(200).json({
          loginSuccess: true
        });
      });

    });
    
  })
});

app.get('/api/user/logout', auth, (req, res) => {
  const { id } = req.user;
  User.findOneAndUpdate({_id: id},{token: ''})
  .then(doc => {
    return res.status(200).json({
      success: true
    });
  })
  .catch(err => {
    return res.json({
      success: false,
      err
    });
  });
});

app.listen(port, () => {
  console.log(`The Vibes server is running on port ${port}`);
});