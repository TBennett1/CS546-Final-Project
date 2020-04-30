const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  res.locals.metaTags = {
    css: '/public/css/style.css'
  };
  if (req.session.user) {
    req.session.user.log = true;
    res.render('pages/index', { loggedin: true, currentUser: req.session.user.username });
  }
  else {
    res.render('pages/index');
  }
});


module.exports = router;