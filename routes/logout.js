const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    res.locals.metaTags = {
        css: '/public/css/style.css'
    };
    if (req.session.user) {
        req.session.destroy();
        res.clearCookie('AuthCookie');
        res.render('pages/logout', {});
    }
    else {
        res.redirect('/index');
    }
});

module.exports = router;