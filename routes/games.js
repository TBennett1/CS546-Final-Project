const express = require('express');
const router = express.Router();
const data = require('../data');
const xss = require('xss');
const game = data.games;
const review = data.reviews;
const comment = data.comments;
const user = data.users;

router.get('/', async (req, res)=>{
    //this is where the list of games would be displayed with the search bar at the top.
    let allGames;
    try {
        allGames = await game.getAllGames();
    } catch (e) {
        console.log(e);
    }
    let flag = false;

    if(req.session.user) flag = true;

    res.render('pages/allGames', {loggedin: flag, userID: req.session.uid, currentUser: req.session.user, game: allGames});
});

router.post('/:game', async (req, res) =>{
    if(!req.session.user){
        return;
    }
    let str=req.params.game;
    
    let gameName=str.toString().replace(/\_/gi," ");
    let newReview;
    try{
        newReview = await review.addReview(gameName, req.session.email, req.body.review, parseInt(req.body.rating));
    }catch(e){
        console.log(e);
        return;
    }
    
    let usr = await user.getUser(newReview.email);
    
    
    res.render('partials/review', {layout:null, author:usr, ...newReview});
});

router.post('/:game/:rid/comment', async (req, res)=>{
    let str=req.params.game;
    let gameName=str.toString().replace(/\_/gi," ");
    let cmnt;
    

    try {
       cmnt = await comment.addComment(gameName,req.body.rid,req.session.email, xss(req.body.comment));
    } catch (e) {
        console.log(e);
    }

    return res.redirect('/games/'+req.params.game);
});

router.get('/:game/:rid/editReview', async (req,res)=>{
    if(!req.session.user){
        return res.redirect('/');
    }
    res.render('pages/editReview', {error:false, etext:"", loggedin: true, currentUser: req.session.user, nameOfGame: req.params.game, rid: req.params.rid});
});


router.post('/:game/:rid/editReview', async (req,res)=>{
    const data = req.body;
    let str=req.params.game;
    let gameName=str.toString().replace(/\_/gi," ");
    if(data.newRating && data.newReview){
        try {
            await review.updateReview(req.params.rid,req.session.email, data.newReview, parseInt(data.newRating));
        } catch (e) {
            return res.render('pages/editReview', {error:true, etext:"could not update review", nameOfGame: xss(gameName), rid:req.params.rid});
        }
    }else{
        return res.render('pages/editReview',{error:true, etext:"Enter input", nameOfGame: xss(gameName), rid: rid});
    }
    return res.redirect('/games/'+req.params.game);
});

router.get('/:game', async (req, res) =>{
    let flag=false;
    let reviews = [];
    let total = 0;
    let gm;

    //let gm = await game.getGame(req.params.game);
    //Added these three lines to fix the href whitespace issue
    let str=req.params.game;
    let gameName=str.toString().replace(/\_/gi," ");
    try{
        gm = await game.getGame(gameName);
    }catch(e){
        console.log(e);
        return res.sendStatus('404');
    }
    //
    for (let i = 0; i < gm.reviews.length; i++){
        let rvw = {};
        const rid = gm.reviews[i];
        let r;
        let author;
        let canEdit = false;
        try{
            r = await review.getReview(rid);
        }catch(e){
            console.log(e);
            return res.sendStatus('404');
        }

        try{
            author = await user.getUser(r.email);
        }catch(e){
            console.log(e);
            return res.sendStatus('404');
        }


        if(req.session.email === author.email) canEdit = true;


        let comments = [];

        for (let j = 0; j < r.comments.length; j++){
            const cid = r.comments[j];
            let c, usr;
            try {
                c = await comment.getComment(cid);
            } catch (e) {
                console.log(e);
                return res.sendStatus('404');
            }

            try {
                usr = await user.getUser(c.email);
            } catch (e) {
               console.log(e);
               return res.sendStatus('404');
            }
            comments.push({'author': usr, 'comment': c.userComments});
        }
        
        rvw['rid'] = rid;
        rvw["review"] = r;
        rvw["upvotes"] = r.upvotes.length;
        rvw["downvotes"] = r.downvotes.length;
        rvw["author"] = author;
        rvw["canEdit"] = canEdit;
        rvw["comments"] = comments;
        reviews.push(rvw);
    }

    reviews.sort(function(a,b){
        return (b.upvotes-b.downvotes) - (a.upvotes-a.downvotes);
    });

    if(reviews.length > 0) reviews[0]["helpful"] = "*Most Helpful Review*";

    for(let i = 0; i < reviews.length; i++){
        total += reviews[i].review.rating;
    }
    
    
    let avgRating = (total/reviews.length);
    
    if(isNaN(avgRating)) avgRating = 0;
    
    if(req.session.user){
        flag=true;
    }

    res.render('pages/game', {
        loggedin: flag,
        userID: req.session.uid,
        currentUser: req.session.user,
        game: gm,
        url: req.params.game, 
        reviews: reviews,
        avgRating: avgRating.toFixed(2)
    });
});

router.post('/:game/upvote', async (req, res) =>{
    if(!req.session.user){
        return;
    }

    let flag=false;
    try{
        await review.upVote(xss(req.body.rid) , req.session.email);
        flag = true;
    }catch(e){
        console.log(e);
    }
    
    res.json({success: flag});
});

router.post('/:game/downvote', async (req, res) =>{
    if(!req.session.user){
        return;
    }
    let flag=false;
    try{
        await review.downVote(req.body.rid, req.session.email);
        flag = true;
    }catch(e){
        console.log(e);
    }
    res.json({success: flag});
})



module.exports = router;
