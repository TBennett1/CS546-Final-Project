const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const userData = require('../data/users');

router.get('/', async (req, res) => {
  res.render('pages/login');
});

router.post("/", async (req, res) => {
  const data = req.body;
  if (!data || !data.username || !data.password) {
    res.status(401).render('pages/login', { error: true, etext: "Invalid Username/Password" });
    console.log("You messed up bro");
    return;
  }

  data.username = data.username.toLowerCase();
  try {
    let success = false;
    console.log("Checkpoint 1");
    try {
      const user = await userData.getUser(data.username);//Change to pull from database

      console.log("Checkpoint 2");
      if (user) {
        console.log("Checkpoint 3");
        try {
          console.log(user.password);
          success = await bcrypt.compare(data.password, user.password);//Change to pull from database
        }
        catch (e) {
          res.status(401).render('pages/login', { error: true, etext: "Invalid Username/Password" });
          console.log("You messed up bro");
        }
        console.log("Checkpoint 4");
        if (success === true) {
          console.log("Checkpoint 5");
          //Worked~
          currentUserFullName = user.firstName + " " + user.lastName;
          req.session.user = currentUserFullName;
          req.session.uid = user._id;
          req.session.AuthCookie = req.sessionID;
          return res.redirect('/');
        }
        else {
          res.status(401).render('pages/login', { error: true, etext: "Invalid Username/Password" });
          console.log("You messed up bro");
        }
      }
      else {
        res.status(401).render('pages/login', { error: true, etext: "Invalid Username/Password" });
        console.log("You messed up bro");
      }
    }
    catch{
      res.status(401).render('pages/login', { error: true, etext: "Invalid Username/Password" });
      console.log("You messed up bro");
    }
  }
  catch (e) {
    console.log("Error TBD");
    res.status(404).json({ error: true });
  }
});

module.exports = router;