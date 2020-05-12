const mongoCollections = require('../config/mongoCollections');
const comments=mongoCollections.comments;
const { ObjectId } = require('mongodb');
const user=require("../data/users");
const users=mongoCollections.users;
const game=require("../data/games");
const games=mongoCollections.games;
const review=require("../data/reviews");
const reviews = mongoCollections.reviews;

//addComment function adds a comment to a review
async function addComment(gameId,reviewId,email,userComments){
    if (!reviewId) throw 'You must provide a review id to comment on';
    if(typeof(reviewId)!='string') throw 'Id of review should be of type: string';
    if (!email) throw 'You must provide an email id to comment';
    if(typeof(email)!='string') throw 'Email Id should be of type: string';
    if (!userComments) throw 'You must provide a comment for the review';
    if(typeof(userComments)!='string') throw 'Comments should be of valid string type';
 time=new Date();
    //Check if the game exists in the database:
    try{
        const gameCheck = await game.getGame(gameId); 
    }catch(e){
        throw "Game does not exist";
    }
    //Check if the user exists in the database:
    try{
        const emailCheck = await user.getUser(email.toLowerCase());
    }catch(e){
        throw "Email does not exist";
    }
    //Check if the review exists in the database:
    try{
        const reviewCheck=await review.getReview(reviewId);
    }catch(e){
      throw "Review does not exist!";
    }
    const commentsCollection = await comments();
    let newComment = {
        email:email.toLowerCase(),
        userComments:userComments,
        timestamp:time
    };

    const insertInfo = await commentsCollection.insertOne(newComment);
    if (insertInfo.insertedCount === 0) throw 'Could not add comment';
    const newId = insertInfo.insertedId;
    newIdString=newId.toString();
    //This will add comments id to the corresponding review 
    await review.addCommentsToReview(reviewId,newIdString);
    //This will add comments id to the corresponding user
    await user.addCommentsToUser(email,newIdString);
    const comment = await this.getComment(newIdString);

    return comment;
}

//Function to get comments by comment id
async function getComment(id){
    if (!id) throw 'You must provide an id to search for';
    const commentCollection = await comments();
    if(typeof id === 'string') id = ObjectId.createFromHexString(id);
    const commenter = await commentCollection.findOne({_id: id});
    if (commenter === null) throw 'No comment with that id';
    return commenter;
}

  //Function to delete a comment:
async function deleteComment(id,reviewId,email){
    if (!id) throw 'You must provide an id to search for';
    if(!reviewId) throw 'Comment must be associated with a valid review id';
    if(!email) throw 'You must provide an email id!';
    //Check if the user deleting the comment is the same as the one who inserted the comment:
    const commentCollection = await comments();
    console.log("one");
    const objId = ObjectId.createFromHexString(id);
    const commentToBeDeleted= await this.getComment(id);
    if(commentToBeDeleted.email!=email.toLowerCase()) throw "You cannot delete comment made by another user!";
    const deletionInfo = await commentCollection.removeOne({_id: objId});
    if (deletionInfo.deletedCount === 0) {
      throw `Could not delete comment with id of ${id}`;
    }
    //Since the comment is deleted, its id should be deleted from the corresponding reviews database
    await review.deleteCommentFromReviews(reviewId,id);
    //Similarly deleting the comment from users database:
    await user.deleteCommentFromUser(email,id);
    return commentToBeDeleted;
}

//If a game is deleted, reviews and comments associated with the game should be deleted
//The following function would delete a game and will be used only by admin:
async function deleteGame(gameId){
    const gameCollection=await games();
    
    //Remove these ratings from users database:
    const gameToBeDeleted=await this.getGame(gameId);
    let ratingsId=gameToBeDeleted.ratings;
    for(let s=0;s<ratingsId.length;s++){
       // const reviewCollection=await reviews();
       const rev= await review.getReview(ratingsId[s]);
       const userCollection=await users();
       const updateUser = await userCollection.updateOne({email:rev.email}, {$pull: {usersReviews: ratingsId[s]}});
       if (!updateInfo.matchedCount && !updateInfo.modifiedCount) throw 'Update failed';

       //return await this.getUser(email);
    }
    //Remove associated comments:
    for(let c=0;c<ratingsId.length;c++){
        const rev= await review.getReview(ratingsId[s]);
        const commentCollection=await comments();
        let commentsId=ratingsId[c].comments;
        for(k=0;k<commentsId.length;k++){
            const updateUser = await userCollection.updateOne({email:commentsId[k].email}, {$pull: {reviewComments: commentsId[k]}});
            if (!updateInfo.matchedCount && !updateInfo.modifiedCount) throw 'Update failed';
            const deletionInfo = await commentCollection.removeOne({_id: commentsId[k]._id});
            const userCollection=await users();
            if (deletionInfo.deletedCount === 0) {
                throw `Could not delete comment with id of ${id}`;
            }
        }
    }
    //Before deleting the game, associated ratings/reviews should be deleted
    for (let r=0;r<ratingsId.length;r++){
        const reviewCollection=await reviews();
        const deletionInfo = await reviewCollection.removeOne({_id: ratingsId[r]});
        if (deletionInfo.deletedCount === 0) {
            throw `Could not delete rating with id of ${id}`;
        }
    }
  
    // delete the game:
    const deletionInfo = await gameCollection.removeOne({_id: gameId});
    if (deletionInfo.deletedCount === 0) {
        throw `Could not delete game with id of ${id}`;
    }   
}
//If a user is deleted, reviews and comments associated with the user will be updated to written by anonymous


module.exports={addComment,getComment,deleteComment,deleteGame}
