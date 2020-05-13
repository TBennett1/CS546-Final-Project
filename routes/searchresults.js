const express = require('express');
const router = express.Router();
const gamesData = require('../data/games');

router.get('/', async (req, res) => {
    if (req.session.user) {
        req.session.user.log = true;
        res.render('pages/searchresults', { loggedin: true, currentUser: req.session.user });
    }
    else {
        res.render('pages/searchresults');
    }
});

router.post('/', async (req, res) => {
    const data = req.body;
    if (!data['text-to-test']) {
        res.status(400);
        res.render('pages/searchresults', { noInput: true });
        return;
    }
    const searchInput = data['text-to-test'].toLowerCase().trim().replace(/\s/g, '');
    const allGames = await gamesData.getAllGames();
    let x = 0;
    let gamesFound = false;
    let gameSearchResult = [];
    for (let i = 0; i < allGames.length; i++) {
        let currentGame = allGames[i].nameOfGame.toLowerCase().trim().replace(/\s/g, '');
        if (currentGame.includes(searchInput)) {
            gamesFound = true;
            gameSearchResult.push(allGames[i]);
            console.log(currentGame);
        }
    }
    console.log("Checkpoint 1");
    console.log(gameSearchResult);
    console.log("Checkpoint 2");
    if (gamesFound === true) {
        let gameResultHandleBarInput = [];
        console.log("Checkpoint 3");
        for (let i=0; i<gameSearchResult.length; i++) {
            gameResultHandleBarInput.push({nameURL: gameSearchResult[i].nameOfGame.trim().replace(/[^a-zA-Z 0-9]+/g,'').replace(/\s/g, '_'), fullName: gameSearchResult[i].nameOfGame, gamePhoto: gameSearchResult[i].gameIcon});
            console.log("Checkpoint 4");
        }
        console.log("Checkpoint 5");
        console.log(gameResultHandleBarInput);
        console.log("Checkpoint 6");
        if (req.session.user) {
            console.log("Checkpoint 7");
            req.session.user.log = true;
            res.render('pages/searchresults', { loggedin: true, currentUser: req.session.user, resultsFound:true, gamesList: gameResultHandleBarInput});
        }
        else {
            console.log("Checkpoint 8");
            res.render('pages/searchresults', {resultsFound: true, gamesList: gameResultHandleBarInput});
        }
    }
    else {
        if (req.session.user) {
            req.session.user.log = true;
            res.render('pages/searchresults', { loggedin: true, currentUser: req.session.user });
        }
        else {
            res.render('pages/searchresults');
        }
    }
});

module.exports = router;