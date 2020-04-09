const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  res.locals.metaTags = {
    css: '/public/css/style.css'
  };
    res.render('pages/index');
  });


module.exports = router;