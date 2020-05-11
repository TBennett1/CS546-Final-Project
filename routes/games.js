const express = require('express');
const router = express.Router();
const data = require('../data');
const game = data.games;
const review = data.reviews;
const comment = data.comments;
const user = data.users;

router.get('/', async (req, res)=>{
    //this is where the list of games would be displayed with the search bar at the top.
    let allGames = await game.getAllGames();

    res.render('pages/allGames', {game: allGames});
});

router.get('/:game', async (req, res) =>{
    let flag=false;
    let reviews = [];
    let total = 0;

    //let gm = await game.getGame(req.params.game);
    //Added these three lines to fix the href whitespace issue
    let str=req.params.game;
   let gameName=str.toString().replace(/\_/gi," ");
    let gm = await game.getGame(gameName);
    //
    for (let i = 0; i < gm.reviews.length; i++){
        let rvw = {};
        const rid = gm.reviews[i];
        let r = await review.getReview(rid);
        let author = await user.getUser(r.email);
        let comments = [];

        for (let j = 0; j < r.comments.length; j++){
            const cid = r.comments[j];
            let c = await comment.getComment(cid);
            let usr = await user.getUser(c.email);
            comments.push({'author': usr, 'comment': c.userComments});
        }
        
        rvw["review"] = r;
        rvw["upvotes"] = r.upvotes.length;
        rvw["downvotes"] = r.downvotes.length;
        rvw["author"] = author;
        rvw["comments"] = comments;
        reviews.push(rvw);
    }

    for(let i = 0; i < reviews.length; i++){
        total += reviews[i].review.rating;
    }

    if(req.session.user){
        flag=true;
    }    
    
    res.render('pages/game', {
        loggedin: flag,
        userID: req.session.uid,
        currentUser: req.session.user,
        game: gm, 
        reviews: reviews,
        avgRating: total/reviews.length
    });
});

module.exports = router;