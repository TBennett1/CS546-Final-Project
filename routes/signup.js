const express = require('express');
const router = express.Router();
const userData = require('../data/users');

router.get('/', async (req, res) => {
    res.render('pages/signup');
});

router.post("/", async (req, res) => {
    const data = req.body;
    if (!data || !data.username || !data.firstname || !data.lastname || !data.password1 || !data.password2) {
        res.status(401).render('pages/signup', { error: true, etext: "Missing Input" });
        console.log("You messed up bro");
        return;
    }
    try {
        data.username = data.username.toLowerCase();
        console.log("Checkpoint 1");
        if (data.password1 === data.password2) {

            console.log("Checkpoint 2");
            console.log(data.firstname);
            console.log(data.lastname);
            console.log(data.username);
            console.log(data.password1);
            console.log(data.password2);
            const newUser = await userData.addUser(data.firstname, data.lastname, data.username, data.password1);
            console.log("Checkpoint 3");
            return res.redirect('/signupsuccess');

        }
        else {
            res.status(401).render('pages/signup', { error: true, etext: "Passwords do not match" });
            console.log("You messed up bro");
        }
    }
    catch (e) {
        console.log("Checkpoint 4");
        console.log(e);
        res.status(401).render('pages/signup', { error: true, etext: e });
        console.log("You messed up bro");
    }
});

module.exports = router;