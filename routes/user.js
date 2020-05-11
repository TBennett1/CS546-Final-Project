const express = require('express');
const router = express.Router();
const data = require('../data');
const userData = data.users;
const reviewData = data.reviews;

router.get('/:id', async (req, res)=>{
    let user;
    let reviews = [];
    if (req.session.user) {
    try {
        user = await userData.getUserById(req.params.id);   
    } catch (e) {
        res.status(404).render('pages/user', {flag: true, error: "User not found", userID: req.session.uid, currentUser: req.session.user});
    }

    for (let i = 0; i < user.usersReviews.length; i++) {
        const rid = user.usersReviews[i];
        let review = await reviewData.getReview(rid);
        reviews.push(review);
    } 
    res.render('pages/user', {flag: false, error: "", loggedin: true, userID: req.session.uid, currentUser: req.session.user,firstName: user.firstName, lastName: user.lastName, email: user.email, posts: reviews, profilePic: user.userProfilePicture});
}else{
    res.render('pages/login',{error:"You need to log in!"});
}}
);

router.post('/:id', async (req, res)=>{
    const data = req.body;
    let firstName = data.newName.split(' ')[0];
    let lastName = data.newName.split(' ')[1];

    const updatedUser = await userData.updateUser(data.currEmail, firstName, lastName, req.body.newPassword, req.body.newEmail);
    return res.redirect('/user/'+req.session.uid);
});


router.post('/:id/edit', async (req, res)=> {
    res.render('partials/editProfile',{ layout: null , userID: req.session.uid});
});

module.exports = router;
