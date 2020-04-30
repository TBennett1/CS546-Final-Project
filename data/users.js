const mongoCollections = require('../config/mongoCollections');
const users = mongoCollections.users;
const { ObjectId } = require('mongodb');
const uuid = require('uuid');
const Bcrypt = require("bcryptjs");
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
    if (!email) throw 'You must provide an id to search for';

    const userCollection = await users();
  // 
   // const objId = ObjectId.createFromHexString(id);
    const usero = await userCollection.findOne({email:email});
    if (usero === null) throw 'No user with that id';

    return usero;
}
//The following function is used to add user to seed the database:

async function addUserSeed(firstName,lastName,email,password){
    const userCollection = await users();
    if (!firstName) throw 'You must provide a first name';
    if(typeof(firstName)!='string') throw 'First Name should be of type: string';
    if (!lastName) throw 'You must provide a last name';
    if(typeof(lastName)!='string') throw 'Last Name should be of type: string';
    if (!email) throw 'You must provide an email';
    if(typeof(email)!='string') throw 'Email should be of type: string';
    if(!password) throw 'Password cannot be left blank';
    if(typeof(password)!="string") throw 'Invalid type of pwd'
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

//Allow the users to edit their profile: Modification recommended by Prof. Hill
//The following function allows a user to modify his/her profile:
async function updateUser(email,firstName,lastName,password){
   
    if (!email) throw 'Cannot update band without an email id';
    if(typeof(firstName)!='string') throw 'First Name should be of type: string';
    if (typeof(lastName)!='string') throw 'Last Name should be of type: string';
    if (typeof(password)!='string') throw 'Password should be of type: String';
    password = await Bcrypt.hash(password, 16);
    const userCollection = await users();
    const updateUser = {
      firstName:firstName,
      lastName:lastName,
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

module.exports={addUser,getAllUsers,getUser,addUserSeed,updateUser,addReviewsToUser}
