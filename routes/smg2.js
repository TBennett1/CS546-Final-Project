const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  res.locals.metaTags = {
    css: '/public/css/supermariogalaxy2style.css'
  };
  //res.render('pages/smg2');
  if (req.session.user) {
    req.session.user.log = true;
    res.render('pages/smg2', { loggedin: true, currentUser: req.session.user});
  }
  else {
    res.render('pages/smg2');
  }
});


module.exports = router;