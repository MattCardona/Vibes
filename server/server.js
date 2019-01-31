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
const { Wood } = require('./models/wood'); 
const { Guitar } = require('./models/guitars'); 

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
//     Guitar routes
//======================
app.get('/api/product/articles_by_id', (req, res) => {
  let type = req.query.type;
  let items = req.query.id;
 
  if(type === 'array'){
    let ids = req.query.id.split(',');
    items = [];
    items = ids.map(item => {
      return mongoose.Types.ObjectId(item);
    });
  }

  Guitar.find({'_id': {$in: items}})
  .populate('brand')
  .populate('wood')
  .exec((err, docs) => {
    return res.status(200).send(docs);
  })

});


app.post('/api/product/article', auth, admin, (req, res) => {
  new Guitar(req.body).save()
  .then(doc => {
    res.status(200).json({
      success: true,
      article: doc
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
//     Types of Woods routes
//======================

app.post('/api/product/wood', auth, admin, (req, res) => {
  new Wood(req.body).save()
  .then(doc => {
    res.status(200).json({
      success: true,
      wood: doc
    });
  })
  .catch(err => {
    return res.json({
      success: false,
      err
    });
  });
});

app.get('/api/product/woods', auth, admin, (req, res) => {
  Wood.find({})
  .then(woods => {
    res.status(200).send(woods);
  })
  .catch(err => {
    return res.status(400).send(err);
  });
});

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

app.get('/api/product/brands', (req, res) => {
  Brand.find({})
  .then(brands => {
    res.status(200).send(brands);
  })
  .catch(err => {
    return res.status(400).send(err);
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