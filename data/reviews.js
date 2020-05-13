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
    time=new Date();
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
        downvotes:[],
        timestamp:time
    };
    // Check if this user already reviewed this particular game:
    //await reviewsCollection.findOne({gameId:gameId,email:email.toLowerCase()})
    const allReviews = await reviewsCollection.find({}).toArray();
    for(let a in allReviews){
        for(let i=0;i<allReviews[a].gameId.length;i++){
            if(gameId===allReviews[a].gameId && email.toLowerCase()===allReviews[a].email){
                throw "User can only review a game once!";
            }
        }
    }

    const insertInfo = await reviewsCollection.insertOne(newReview);
    if (insertInfo.insertedCount === 0) throw 'Could not add review';
    const newId = insertInfo.insertedId;
    newIdString=newId.toString();
    //This will add reviews/ratings id to the corresponding game 
    await game.addReviewsToGame(gameId,newIdString);
    await game.addRating(gameId, rating);
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
        for(let i=0;i<allReviews[a].gameId.length;i++){
            if(gameId==allReviews[a].gameId){
                allReviewsOfGame=allReviews[a];  
            }
        }
    }
    return allReviewsOfGame;
}

async function addCommentsToReview(reviewId,commentId){
    if (!reviewId) throw 'You must provide an id to search for';
    if(!commentId) throw 'You must provide a comment id';
    const reviewCollection = await reviews();
    const objId = ObjectId.createFromHexString(reviewId);
    const review = await reviewCollection.findOne({_id: objId});
    if (review === null) throw 'No review with that id';
    const updateInfo = await reviewCollection.updateOne({_id: objId}, {$addToSet: {comments: commentId}});
    if (!updateInfo.matchedCount && !updateInfo.modifiedCount) throw 'Update failed';

    return review;
}
  
//Function to delete comment from review if the comment is deleted
async function deleteCommentFromReviews(reviewId,commentId){

}
  
  //Function to remove a review
  
  //Function to add upvotes, it returns total number of upvotes
  
async function upVote(reviewId,email){
    //Check if the user has previously upvoted or downvoted
    if (!reviewId) throw 'You must provide a review id!';
    if(!email) throw 'You must provide an email id';
    const reviewCollection = await reviews();
    const objId = ObjectId.createFromHexString(reviewId);
    const reviewer = await reviewCollection.findOne({_id: objId});
    
    for(let e in reviewer.upvotes){
        if(email ==reviewer.upvotes[e]){
            //So the user wants to undo his previous upvote
            //throw "You can only upvote a review once!";
            const updateInfo = await reviewCollection.updateOne({_id: reviewer._id}, {$pull: {upvotes: email}});
            if (!updateInfo.matchedCount && !updateInfo.modifiedCount) throw 'Removal failed';
            const reviewUp = await reviewCollection.findOne({_id: objId});
            let totalUpvotes=reviewUp.upvotes.length;
        //  console.log(totalUpvotes);
            return totalUpvotes;
        }
    }
    for(let x in reviewer.downvotes){
        if(email==reviewer.downvotes[x]){
            //So the user had previously downvoted a review and now wants to upvote it
            const updateInfo = await reviewCollection.updateOne({_id: reviewer._id}, {$pull: {downvotes: email}});
            if (!updateInfo.matchedCount && !updateInfo.modifiedCount) throw 'Removal failed';
        }
    }
    const newUp=await reviewCollection.updateOne({_id: reviewer._id},{ $addToSet: {upvotes: email }});
    const reviewUp = await reviewCollection.findOne({_id: objId});
    let totalUpvotes=reviewUp.upvotes.length;
    //  console.log(totalUpvotes);
    return totalUpvotes;
  }
  //Function to add downvotes, it returns total number of downvotes
  
async function downVote(reviewId,email){
    //Check if the user has previously upvoted or downvoted
    if (!reviewId) throw 'You must provide a review id!';
    if(!email) throw 'You must provide an email id';
    const reviewCollection = await reviews();
    const objId = ObjectId.createFromHexString(reviewId);
    const reviewer = await reviewCollection.findOne({_id: objId});
    for(e in reviewer.downvotes){
        if(email ==reviewer.downvotes[e]){
            //throw "You can only downvote a review once!";
            //If a user again tries to downvote, it would undo the previous downvote
            const updateInfo = await reviewCollection.updateOne({_id: reviewer._id}, {$pull: {downvotes: email}});
            if (!updateInfo.matchedCount && !updateInfo.modifiedCount) throw 'Removal failed';
            const reviewDwn = await reviewCollection.findOne({_id: objId});
            let totalDownvotes=reviewDwn.downvotes.length;
            return totalDownvotes;
        }
    }

    for(let x in reviewer.upvotes){
        if(email==reviewer.upvotes[x]){
            //So the user had previously upvoted a review and now wants to downvote it
            const updateInfo = await reviewCollection.updateOne({_id: reviewer._id}, {$pull: {upvotes: email}});
            if (!updateInfo.matchedCount && !updateInfo.modifiedCount) throw 'Removal failed';
        }
    }
    const newDown=reviewCollection.updateOne({_id: reviewer._id},{ $addToSet: {downvotes: email }});
    const reviewDown = await reviewCollection.findOne({_id: objId});
    let totalDownvotes=reviewDown.downvotes.length;
    // console.log(totalDownvotes);
    return totalDownvotes;
}


  //function to update review
  async function updateReview(reviewId,email,userReviews,rating){
    if (!reviewId) throw 'Cannot update review without id';
    if(typeof(reviewId)!='string') throw 'Id of review should be of type: string';
    if (!email) throw 'You must provide an email id to give a review';
    if(typeof(email)!='string') throw 'Email Id should be of type: string';
  if (!userReviews) throw 'You must provide a review for the game';
  if(typeof(userReviews)!='string') throw 'Reviews should be of valid string type';
  if (!rating) throw 'You must provide a rating';
  if(typeof(rating)!='number') throw "Rating should be of type number";
 time=new Date();
  //Check if the same user who wrote the review is trying to update it
  const reviewsCollection = await reviews();
  let updateReview = {
    userReviews:userReviews,
    rating:rating,
      timestamp:time
  };
  //getreview and check if email id matches
  
  const check=await this.getReview(reviewId);
  if (check.email!=email)
  {
    throw "You are not authorized to update this review!";
    return;
  }  
  const objId = ObjectId.createFromHexString(reviewId);
  const updatedInfo = await reviewsCollection.updateOne({_id:objId}, {$set: updateReview});
  if (updatedInfo.modifiedCount === 0) {
    throw 'could not update review successfully';
  }

  return await this.getReview(reviewId);
}
//
//This function sorts reviews based on most helpful reviews.ie. upvotes minus downvotes
 async function sortReview(){
    const reviewCollection = await reviews();
   const reviewList = await reviewCollection.find({}).toArray();
   var r,count;
  for(r in reviewList){
      reviewList[r].count=reviewList[r].upvotes.length-reviewList[r].downvotes.length;
     let objId= reviewList[r]._id;
      const updatedInfo = await reviewCollection.updateOne({_id:objId}, {$set: {count:reviewList[r].count}});
  }
  const res = await reviewCollection.find({}).sort({ count: -1 }).toArray();
return res;  
}

module.exports={addReview,getReview,getAllReviewsOfGame,addCommentsToReview,deleteCommentFromReviews,upVote,downVote,updateReview,sortReview}
