const mongoCollections = require('../config/mongoCollections');
const games = mongoCollections.games;
const { ObjectId } = require('mongodb');
const uuid = require('uuid');

async function addGame(nameOfGame,gameIcon){
    const gameCollection = await games();
    if (!nameOfGame) throw 'You must provide a name for your game';
    if(typeof(nameOfGame)!='string') throw 'Name of game should be of type: string';
    if (!gameIcon) throw 'You must provide a path for icon of your game';
    if(typeof(gameIcon)!='string') throw 'Path of icon should be of type: string';

    let newGame={
        nameOfGame: nameOfGame,
        gameIcon:gameIcon,
        ratings:[],
        reviews:[]
    };
    const insertInfo = await gameCollection.insertOne(newGame);
    if (insertInfo.insertedCount === 0) throw 'Could not add game';

    const newId = insertInfo.insertedId;
    newIdString=newId.toString();
   // console.log(newIdString);
    const game = await this.getGame(newIdString);
    return game;
}


async function getAllGames(){
    const gameCollection = await games();

    const allGames = await gameCollection.find({}).toArray();

    return allGames;
}
async function getGame(id){
    if (!id) throw 'You must provide an id to search for';

    const gameCollection = await games();
  // 
    const objId = ObjectId.createFromHexString(id);
    const gameo = await gameCollection.findOne({_id: objId});
    if (gameo === null) throw 'No game with that id';

    return gameo;
}

//The following function will add reviews to game
async function addReviewsToGame(gameId,reviewId){
    const gameCollection = await games();
    
    const objId = ObjectId.createFromHexString(gameId);
    const updateInfo = await gameCollection.updateOne({_id: objId}, {$addToSet: {ratings: reviewId, reviews:reviewId}});
    if (!updateInfo.matchedCount && !updateInfo.modifiedCount) throw 'Update failed';
  
    return await this.getGame(gameId);
  }
module.exports={addGame,getAllGames,getGame,addReviewsToGame}
