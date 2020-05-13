const express = require('express');
const router = express.Router();
const data = require('../data');
const game = data.games;
const review = data.reviews;
const comment = data.comments;
const user = data.users;

router.get('/', async (req, res)=>{
    //this is where the list of games would be displayed with the search bar at the top.
    let highestRated;
    try {
        highestRated = await review.sortReview();
    } catch (e) {
        console.log(e);
    }
    let flag = false;

    if(req.session.user) flag = true;

    res.render('pages/highestRated', {loggedin: flag, userID: req.session.uid, currentUser: req.session.user, review: highestRated});
});



module.exports=router;
