const express = require('express');
const router = express.Router();
const userData = require('../data/users');
const multer = require('multer');
const fs = require('fs');
const path = require("path");

const handleError = (err, res) => {
    res
        .status(500)
        .contentType("text/plain")
        .end("Oops! Something went wrong!");
};

router.get('/', express.static(path.join(__dirname, "./views/pages")), async (req, res) => {
    res.render('pages/signup');
});

const upload = multer({
    dest: "./Temp/Uploads"
});

router.post("/", upload.single("file" /* name attribute of <file> element in your form */), async (req, res) => {
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

            //     console.log("Checkpoint 2");
            console.log(data.firstname);
            console.log(data.lastname);
            console.log(data.username);
            console.log(data.password1);
            console.log(data.password2);
            //     const newUser = await userData.addUser(data.firstname, data.lastname, data.username, data.password1);
            //     console.log("Checkpoint 3");
            //     return res.redirect('/signupsuccess');

            // }
            console.log(req.body.username);
            try {
                const tempPath = req.file.path;
                console.log("Checkpoint 2");
                const newFileName = data.username.replace(/[^a-zA-Z0-9]/, "").replace(".", "") + "ProfilePicture.png"
                const targetPath = path.join(__dirname, "../images/" + newFileName);
                console.log("Checkpoint 3");
                console.log(path.extname(req.file.originalname).toLowerCase());
                if (path.extname(req.file.originalname).toLowerCase() === ".png" || path.extname(req.file.originalname).toLowerCase() === ".jpg") {
                    console.log("Checkpoint 4");
                    fs.rename(tempPath, targetPath, async err => {
                        console.log("Checkpoint 5");
                        if (err) {
                            console.log(err);
                            return handleError(err, res);
                        }
                        try {
                            const newUser = await userData.addUser(data.firstname, data.lastname, data.username, data.password1, newFileName);
                        }
                        catch{
                            res.status(401).render('pages/signup', { error: true, etext: "Account already exists on this email" });
                            console.log("You messed up bro");
                            return;
                        }
                        console.log("Checkpoint 6");
                        return res.redirect('/signupsuccess');
                    });
                }
                else {
                    fs.unlink(tempPath, err => {
                        console.log("Checkpoint 7");
                        if (err) {
                            console.log(err);
                            return handleError(err, res);
                        }
                        console.log("Checkpoint 8");
                        res.status(401).render('pages/signup', { error: true, etext: "Only .png & .jpg files are allowed!" });
                        console.log("You messed up bro");
                    });
                }
                console.log("Checkpoint 9");
                console.log("Checkpoint 10");

            }
            catch{
                res.status(401).render('pages/signup', { error: true, etext: "Missing Input" });
                console.log("You messed up bro");
            }
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