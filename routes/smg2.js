const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    res.locals.metaTags = {
        css: '/public/css/supermariogalaxy2style.css'
    };
    res.render('pages/smg2');
  });


module.exports = router;