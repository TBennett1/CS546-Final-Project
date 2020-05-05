const mongoCollections = require('../config/mongoCollections');
const reviews = mongoCollections.reviews;
const { ObjectId } = require('mongodb');
const user=require("../data/users");
const users=mongoCollections.users;
const game=require("../data/games");
const games=mongoCollections.games;
//const uuid = require('uuid');
//addReview function adds a review to a game
async function addReview(gameId,email,userReviews,rating){
    if (!gameId) throw 'You must provide an id for your game';
    if(typeof(gameId)!='string') throw 'Id of game should be of type: string';
    if (!email) throw 'You must provide an email id to give a review';
    if(typeof(email)!='string') throw 'Email Id should be of type: string';
  if (!userReviews) throw 'You must provide a review for the game';
  if(typeof(userReviews)!='string') throw 'Reviews should be of valid string type';
  if (!rating) throw 'You must provide a rating';
  if(typeof(rating)!='number') throw "Rating should be of type number";
 //Check if the game exists in the database:
 try{
 const gameCheck = await game.getGame(gameId); 
 }
 catch(e){
   throw "Game does not exist";
 }
 //Check if the user exists in the database:
 try{
  const emailCheck = await user.getUser(email.toLowerCase());
  }
  catch(e){
    throw "Email does not exist";
  }
  const reviewsCollection = await reviews();
  let newReview = {
      gameId:gameId,
      email:email.toLowerCase(),
    userReviews:userReviews,
    rating:rating,
    comments:[],
    upvotes:[],
    downvotes:[]
  };
  // Check if this user already reviewed this particular game:
//await reviewsCollection.findOne({gameId:gameId,email:email.toLowerCase()})
const allReviews = await reviewsCollection.find({}).toArray();
    for(let a in allReviews){
      let i;
       for(i=0;i<allReviews[a].gameId.length;i++){
         if(gameId==allReviews[a].gameId && email.toLowerCase()==allReviews[a].email){
           throw "User can only review a game once!";
          }}}
  
  const insertInfo = await reviewsCollection.insertOne(newReview);
  if (insertInfo.insertedCount === 0) throw 'Could not add review';
  const newId = insertInfo.insertedId;
  newIdString=newId.toString();
  //This will add reviews/ratings id to the corresponding game 
  await game.addReviewsToGame(gameId,newIdString);
  //This will add reviews/ratings id to the corresponding user
  await user.addReviewsToUser(email,newIdString);
  const review = await this.getReview(newIdString);
  
  return review;
}

//Function to get reviews by review id
async function getReview(id){
    if (!id) throw 'You must provide an id to search for';
    const reviewCollection = await reviews();
   const objId = ObjectId.createFromHexString(id);
    const reviewer = await reviewCollection.findOne({_id: objId});
    if (reviewer === null) throw 'No review with that id';
    return reviewer;
  }

//Function to get all reviews of a particular game
async function getAllReviewsOfGame(gameId) {
  let allReviewsOfGame;
    const reviewCollection = await reviews();
    const allReviews = await reviewCollection.find({}).toArray();
    for(let a in allReviews){
      let i;
       for(i=0;i<allReviews[a].gameId.length;i++){
         if(gameId==allReviews[a].gameId){
           allReviewsOfGame=allReviews[a];  
          }}}
         
    return allReviewsOfGame;
  }

  //Function to add comments to a review
 async function addCommentsToReview(reviewId,commentId){
  if (!reviewId) throw 'You must provide an id to search for';
  if(!commentId) throw 'You must provide a comment id';
  const reviewCollection = await reviews();
 const objId = ObjectId.createFromHexString(reviewId);
  const reviewer = await reviewCollection.findOne({_id: objId});
  if (reviewer === null) throw 'No review with that id';
  const updateInfo = await reviewCollection.updateOne({_id: objId}, {$addToSet: {comments: commentId}});
  if (!updateInfo.matchedCount && !updateInfo.modifiedCount) throw 'Update failed';

  return reviewer;
 }

 //Function to delete comment from review if the comment is deleted
async function deleteCommentFromReviews(reviewId,commentId){

}

//Function to remove a review
module.exports={addReview,getReview,getAllReviewsOfGame,addCommentsToReview,deleteCommentFromReviews}
//,updateReview,removeReviewDueToUser,removeReview
