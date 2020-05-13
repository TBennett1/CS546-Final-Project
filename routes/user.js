const express = require('express');
const router = express.Router();
const data = require('../data');
const userData = data.users;
const reviewData = data.reviews;
const multer = require('multer');
const fs = require('fs');
const path = require("path");
const xss = require('xss');

const handleError = (err, res) => {
    res
        .status(500)
        .contentType("text/plain")
        .end("Oops! Something went wrong!");
};

router.get('/:id', async (req, res) => {
    let user;
    let reviews = [];

    try {
        user = await userData.getUserById(req.params.id);
    } catch (e) {
        res.status(404).render('pages/user', { flag: true, error: "User not found", userID: req.session.uid, currentUser: req.session.user });
    }

    for (let i = 0; i < user.usersReviews.length; i++) {
        const rid = user.usersReviews[i];
        let review = await reviewData.getReview(rid);
        reviews.push(review);
    }
    res.render('pages/user', { flag: false, error: "", loggedin: true, userID: req.session.uid, currentUser: req.session.user, firstName: user.firstName, lastName: user.lastName, email: user.email, posts: reviews, profilePic: user.userProfilePicture });
});

const upload = multer({
    dest: "./Temp/Uploads"
});

router.post('/:id', upload.single("file" /* name attribute of <file> element in your form */), async (req, res) => {
    const data = req.body;
    let firstName = xss(data.firstName);
    let lastName = xss(data.lastName);
    if(req.file){
        try {
            const tempPath = req.file.path;
            console.log("Checkpoint 2");
            const currentUser = await userData.getUserById(req.session.uid);
            console.log(currentUser);
            console.log(currentUser.email);
            const newFileName = currentUser.email.replace(/[^a-zA-Z0-9]/, "").replace(".", "") + "ProfilePicture.png"
            const targetPath = path.join(__dirname, "../images/" + newFileName);
            console.log("Checkpoint 3");
            console.log(path.extname(req.file.originalname).toLowerCase());
            if (path.extname(req.file.originalname).toLowerCase() === ".png" || path.extname(req.file.originalname).toLowerCase() === ".jpg") {
                console.log("Checkpoint 4");
                fs.rename(tempPath, targetPath, err => {
                    console.log("Checkpoint 5");
                    if (err) {
                        console.log(err);
                        return handleError(err, res);
                    }
                    console.log("Checkpoint 6");
                    //return res.redirect('/user/' + req.session.uid);
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
                    console.log("You messed up bro");
                    return res.status(401).render('pages/user', { error: true, etext: "Only .png & .jpg files are allowed!" });
                    
                });
            }
            
        }
        catch (e) {
            console.log(e);
        }
    }
    try {
        if(firstName || lastName || req.body.newPassword){
            const updatedUser = await userData.updateUser(req.session.uid, firstName, lastName, req.body.newPassword);
        }
    } catch (e) {
        console.log(e);
        return res.status(500).render('pages/user', { error: true, etext: e});
    }
    
    return res.redirect('/user/' + req.session.uid);
});


router.post('/:id/edit', express.static(path.join(__dirname, "./views/pages")), async (req, res) => {
    res.render('partials/editProfile', { layout: null, userID: req.session.uid });
});

module.exports = router;