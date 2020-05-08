const express = require('express');
const router = express.Router();
const data = require('../data');
const userData = data.users;
const postData = data.reviews;

router.get('/:id', async (req, res)=>{
    try {
        let user = await userData.getUser(req.params.id);
        let reviews = [];
        for (let i = 0; i < user.usersReviews.length; i++) {
            const element = user.usersReviews[i];
            let review = await postData.getPostById(element);
            reviews.push(review);
        }
        res.render('pages/user', {flag: false, error: "", firstName: user.firstName, lastName: user.lastName, email: user.email, posts: reviews})
    } catch (e) {
        res.status(404).render('pages/user', {flag: true, error: "User not found"});
    }
});

router.put('/edit', async (req, res)=> {
    let userInfo = req.body;

    if(!userInfo){
        res.status(400).render('pages/user', {flag: true, error: "Must provide data to edit profile!"});
    }
});

module.exports = router;