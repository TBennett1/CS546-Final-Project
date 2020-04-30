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

// router.get('/:id', async (req, res) =>{
//     gm = await game.getGame(req.params.id);
//     res.redirect('/:game');
// });

router.get('/:game', async (req, res) =>{
    let reviews = [];
    let comments = [];
    let upvotes = 0;
    let downvotes = 0;
    
    let gm = await game.getGame(req.params.game);
    
    for (let j = 0; j < gm.reviews.length; j++){
        const rid = gm.reviews[j];
        let r = await review.getReviewById(rid);
        upvotes = r.upvotes.length;
        downvotes = r.downvotes.length;
        reviews.push(r);
    }
    for (let i = 0; i < reviews.length; i++) {
        const r = reviews[i];
        for (let j = 0; j < r.comments.length; j++){
            const cid = r.comments[j];
            let c = await comment.getCommentById(cid);
            let usr = await user.getUserById(c.userId);

            comments.push([usr, c]);
        }
    }
    res.render('pages/game', {
        game: gm, 
        reviews: reviews,
        comments: comments, 
        upvotes: upvotes, 
        downvotes: downvotes
    });
});

module.exports = router;