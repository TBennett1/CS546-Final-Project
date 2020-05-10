const express = require('express');
const router = express.Router();
const data = require('../data');
const userData = data.users;
const reviewData = data.reviews;

router.get('/:id', async (req, res)=>{
    let user;
    let reviews = [];

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
    console.log(reviews);
    
    res.render('pages/user', {flag: false, error: "", loggedin: true, userID: req.session.uid, currentUser: req.session.user,firstName: user.firstName, lastName: user.lastName, email: user.email, posts: reviews, profilePic: user.userProfilePicture})
});

router.put('/edit', async (req, res)=> {
    let userInfo = req.body;

    if(!userInfo){
        res.status(400).render('pages/user', {flag: true, error: "Must provide data to edit profile!"});
    }
});

module.exports = router;