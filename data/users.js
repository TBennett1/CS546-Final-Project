const mongoCollections = require('../config/mongoCollections');
const users = mongoCollections.users;
const { ObjectId } = require('mongodb');
const Bcrypt = require("bcrypt");
// The following function adds user through GET request:
async function addUser(firstName,lastName,email,password){
    const userCollection = await users();
    if (!firstName) throw 'You must provide a first name';
    if(typeof(firstName)!='string') throw 'First Name should be of type: string';
    if (!lastName) throw 'You must provide a last name';
    if(typeof(lastName)!='string') throw 'Last Name should be of type: string';
    if (!email) throw 'You must provide an email';
    if(typeof(email)!='string') throw 'Email should be of type: string';
    if(!password) throw 'Password cannot be left blank';
    if(password.length>10) throw 'Length of password should be less than 10 characters'
    //Checking if user (email id) already exists in the database
    const allUsers = await userCollection.find({}).toArray();
    let index;
    for(index = 0; index < allUsers[index].email.length; index++){
    if(email.toLowerCase()==allUsers[index].email) throw "Email id already in use!";
    }
    
    password = await Bcrypt.hash(password, 16);
  //  console.log(password);
   //used this code from lecture code
    let newUser={
        firstName:firstName,
        lastName:lastName,
        email:email.toLowerCase(),
        password:password,
        usersReviews:[],
        votedReviews:[],
        reviewComments:[],
        userProfilePicture:""
    };
    const insertInfo = await userCollection.insertOne(newUser);
    if (insertInfo.insertedCount === 0) throw 'Could not add user';

    const newId = insertInfo.insertedId;
    newIdString=newId.toString();
   // console.log(newIdString);
    const user = await this.getUser(email);
    return user;
}


async function getAllUsers(){
    const userCollection = await users();

    const allUsers = await userCollection.find({}).toArray();

    return allUsers;
}

async function getUser(email){
    if (!email) throw 'You must provide an email to search for';

    const userCollection = await users();
    // const objId = ObjectId.createFromHexString(id);
    const usero = await userCollection.findOne({email:email.toLowerCase()});
    if (usero === null) throw 'No user with that email';

    return usero;
}

async function getUserById(id){
    if(!id) throw "You must provide an id to search for.";

    const userCollection = await users();
    const objId = ObjectId.createFromHexString(id);
    const user = await userCollection.findOne({_id: objId});
    if(user === null) throw "No user with that id.";

    return user;
}

//The following function is used to add user to seed the database:

async function addUserSeed(firstName,lastName,email,password,profilePic){
    const userCollection = await users();
    if (!firstName) throw 'You must provide a first name';
    if(typeof(firstName)!='string') throw 'First Name should be of type: string';
    if (!lastName) throw 'You must provide a last name';
    if(typeof(lastName)!='string') throw 'Last Name should be of type: string';
    if (!email) throw 'You must provide an email';
    if(typeof(email)!='string') throw 'Email should be of type: string';
    if(!password) throw 'Password cannot be left blank';
    if(typeof(password)!="string") throw 'Invalid type of pwd'
    if(!profilePic) throw 'You must provide a profile picture.'
    if(typeof(profilePic) != 'string') throw 'Invalid type of profile pic. Should be String.'
    //Checking if user (email id) already exists in the database
    const allUsers = await userCollection.find({}).toArray();
   /*
    let index;
    for(index = 0; index < allUsers[index].email.length; index++){
    if(email==allUsers[index].email) throw "Email id already in use!";
    }
   */ 
  //Not hashing the password as I am already providing hashed password to seed the database
   // password = await Bcrypt.hash(password, 16);
   // console.log(password);
   //used this code from lecture code
    let newUser={
        firstName:firstName,
        lastName:lastName,
        email:email.toLowerCase(),
        password:password,
        usersReviews:[],
        votedReviews:[],
        reviewComments:[],
        userProfilePicture: profilePic
    };
    const insertInfo = await userCollection.insertOne(newUser);
    if (insertInfo.insertedCount === 0) throw 'Could not add user';

    const newId = insertInfo.insertedId;
    newIdString=newId.toString();
   // console.log(newIdString);
    const user = await this.getUser(email);
    return user;
}

//Allow the users to edit their profile: Modification recommended by Prof. Hill
//The following function allows a user to modify his/her profile:
async function updateUser(email,firstName,lastName,password,newEmail){
    if (!email) throw 'Cannot update user without an email id';
    if(typeof(firstName)!='string') throw 'First Name should be of type: string';
    if (typeof(lastName)!='string') throw 'Last Name should be of type: string';
    if (typeof(password)!='string') throw 'Password should be of type: String';
    if (typeof(email)!='string') throw 'Email should be of type: String';

    if(newEmail === '') newEmail = email;

    let u = await this.getUser(email);
    if(password != '') password = await Bcrypt.hash(password, 16);
    else password = u.password;

    const userCollection = await users();
    const updateUser = {
      firstName:firstName,
      lastName:lastName,
      email:newEmail,
      password:password
    };
  //  const { ObjectId } = require('mongodb');
  // const objId = ObjectId.createFromHexString(bandId);
    const updatedInfo = await userCollection.updateOne({email:email}, {$set: updateUser});
    if (updatedInfo.modifiedCount === 0) {
      throw 'could not update user successfully';
    }

    return await this.getUser(email);
  }

  //The following function will add reviews to user
async function addReviewsToUser(email,reviewId){
    const userCollection = await users();
    email=email.toLowerCase();
    const updateInfo = await userCollection.updateOne({email:email}, {$addToSet: {usersReviews: reviewId}});
    if (!updateInfo.matchedCount && !updateInfo.modifiedCount) throw 'Update failed';

    return await this.getUser(email);
}

async function addCommentsToUser(email,commentId){
    if (!email) throw 'You must provide an email id to comment';
    if(!commentId) throw 'You must provide a comment id';
    const userCollection = await users();
    const objId = ObjectId.createFromHexString(commentId);
    const userComment = await userCollection.findOne({email: email});
    if (userComment === null) throw 'No user with that email';
    const updateInfo = await userCollection.updateOne({email: email}, {$addToSet: {reviewComments: commentId}});
    if (!updateInfo.matchedCount && !updateInfo.modifiedCount) throw 'Update failed';

    return userComment;
}

module.exports={addUser,getAllUsers,getUser,getUserById,addUserSeed,updateUser,addReviewsToUser, addCommentsToUser};
