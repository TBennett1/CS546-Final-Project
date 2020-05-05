const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const userData = require('../data/users');

router.get('/', async (req, res) => {
  res.locals.metaTags = {
    css: '/public/css/style.css'
  };
  res.render('pages/login');
});

router.post("/", async (req, res) => {
  const data = req.body;
  if (!data || !data.username || !data.password) {
    res.status(400);
    return;
  }

  data.username = data.username.toLowerCase();
  try {
    let success = false;
    const user = userData.find(u => u.username === data.username);
    if (user) {
      success = await bcrypt.compare(data.password, user.hashedPassword);

      if (success === true) {
        //Worked~
        console.log(user);
        req.session.user = user;
        req.session.AuthCookie = req.sessionID;
        return res.redirect('/index');
      }
      else {
        res.status(401).render('pages/login', {error: true, etext: "Invalid Password" });
        console.log("You messed up bro");
      }
    }
    else {
      res.status(401).render('pages/login', {error: true, etext: "Invalid username" });
      console.log("You messed up bro");
    }
  }
  catch{
    console.log("Error TBD");
    res.status(404).json({ error: true });
  }
});

module.exports = router;