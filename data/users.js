const mongoCollections = require('../config/mongoCollections');
const users = mongoCollections.users;
const { ObjectId } = require('mongodb');
const Bcrypt = require("bcrypt");

var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
// The following function adds user through GET request:
async function addUser(firstName, lastName, email, password, profilePic) {
    console.log("Checkpoint 5");
    const userCollection = await users();
    if (!firstName) throw 'You must provide a first name';
    if (typeof (firstName) != 'string') throw 'First Name should be of type: string';
    if (!lastName) throw 'You must provide a last name';
    if (typeof (lastName) != 'string') throw 'Last Name should be of type: string';
    if (!email) throw 'You must provide an email';
    if (typeof (email) != 'string') throw 'Email should be of type: string';
    if (!password) throw 'Password cannot be left blank';
    if (password.length > 10) throw 'Length of password should be less than 10 characters'
    //Checking if user (email id) already exists in the database
    console.log("Checkpoint 6");
    console.log(firstName);
    console.log(lastName);
    console.log(email);
    console.log(password);
    const allUsers = await userCollection.find({}).toArray();
    console.log("Checkpoint 6.25");
    let index;
    for (index = 0; index < allUsers.length - 1; index++) {
        //console.log(allUsers[index].email);
        console.log("Checkpoint 6.5");
        if (email.toLowerCase() === allUsers[index].email) throw "Email id already in use!";
        console.log("Checkpoint 6.75");
        console.log(index);
        // console.log(allUsers[index+1].email);
        // console.log("Checkpoint 6.85");
        // console.log(allUsers[index+1].email.length);
        // console.log("Checkpoint 6.95");
    }
    console.log("Checkpoint 7");
    password = await Bcrypt.hash(password, 16);
    //  console.log(password);
    //used this code from lecture code
    console.log("Checkpoint 8");
    let newUser = {
        firstName: firstName,
        lastName: lastName,
        email: email.toLowerCase(),
        password: password,
        usersReviews: [],
        votedReviews: [],
        reviewComments: [],
        userProfilePicture: profilePic
    };
    console.log("Checkpoint 9");
    const insertInfo = await userCollection.insertOne(newUser);
    console.log("Checkpoint 10");
    if (insertInfo.insertedCount === 0) throw 'Could not add user';

    const newId = insertInfo.insertedId;
    newIdString = newId.toString();
    // console.log(newIdString);
    const user = await this.getUser(email);
    console.log("Checkpoint 11");
    return user;
}

async function getAllUsers() {
    const userCollection = await users();

    const allUsers = await userCollection.find({}).toArray();

    return allUsers;
}

async function getUser(email) {
    if (!email) throw 'You must provide an email to search for';

    const userCollection = await users();
    // const objId = ObjectId.createFromHexString(id);
    const usero = await userCollection.findOne({ email: email.toLowerCase() });
    if (usero === null) throw 'No user with that email';

    return usero;
}

async function getUserById(id) {
    if (!id) throw "You must provide an id to search for.";

    const userCollection = await users();
    const objId = ObjectId.createFromHexString(id);
    const user = await userCollection.findOne({ _id: objId });
    if (user === null) throw "No user with that id.";

    return user;
}

//The following function is used to add user to seed the database:

async function addUserSeed(firstName, lastName, email, password, profilePic) {
    const userCollection = await users();
    if (!firstName) throw 'You must provide a first name';
    if (typeof (firstName) != 'string') throw 'First Name should be of type: string';
    if (!lastName) throw 'You must provide a last name';
    if (typeof (lastName) != 'string') throw 'Last Name should be of type: string';
    if (!email) throw 'You must provide an email';
    if (typeof (email) != 'string') throw 'Email should be of type: string';
    
    if(!email.match(mailformat)) throw "Invalid email type"; //Reference: w3resource.com
    if (!password) throw 'Password cannot be left blank';
    if (typeof (password) != "string") throw 'Invalid type of pwd'
    if (!profilePic) throw 'You must provide a profile picture.'
    if (typeof (profilePic) != 'string') throw 'Invalid type of profile pic. Should be String.'
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
    let newUser = {
        firstName: firstName,
        lastName: lastName,
        email: email.toLowerCase(),
        password: password,
        usersReviews: [],
        votedReviews: [],
        reviewComments: [],
        userProfilePicture: profilePic
    };
    const insertInfo = await userCollection.insertOne(newUser);
    if (insertInfo.insertedCount === 0) throw 'Could not add user';

    const newId = insertInfo.insertedId;
    newIdString = newId.toString();
    // console.log(newIdString);
    const user = await this.getUser(email);
    return user;
}

//Allow the users to edit their profile: Modification recommended by Prof. Hill
//The following function allows a user to modify his/her profile:
async function updateUser(id,firstName,lastName,password){
    if (!id) throw 'Cannot update user without an id';
    if(typeof(firstName)!='string') throw 'First Name should be of type: string';
    if (typeof(lastName)!='string') throw 'Last Name should be of type: string';
    if (typeof(password)!='string') throw 'Password should be of type: String';
   // if (typeof(email)!='string') throw 'Email should be of type: String';
   
  // const objId = ObjectId.createFromHexString(id);

    let u = await this.getUserById(id);
    if(password != '') password = await Bcrypt.hash(password, 16);
    else password = u.password;

    const userCollection = await users();
    const updateUser = {
      firstName:firstName,
      lastName:lastName,
      password:password

    };
    //  const { ObjectId } = require('mongodb');
    const objId = ObjectId.createFromHexString(id);
    const updatedInfo = await userCollection.updateOne({ _id:objId }, { $set: updateUser });
    if (updatedInfo.modifiedCount === 0) {
        throw 'could not update user successfully';
    }

    return await this.getUserById(id);
}

//The following function will add reviews to user
async function addReviewsToUser(email, reviewId) {
    const userCollection = await users();
    email = email.toLowerCase();
    const updateInfo = await userCollection.updateOne({ email: email }, { $addToSet: { usersReviews: reviewId } });
    if (!updateInfo.matchedCount && !updateInfo.modifiedCount) throw 'Update failed';

    return await this.getUser(email);
}

async function addCommentsToUser(email, commentId) {
    if (!email) throw 'You must provide an email id to comment';
    if (!commentId) throw 'You must provide a comment id';
    email=email.toLowerCase();
    const userCollection = await users();
    const objId = ObjectId.createFromHexString(commentId);
    const userComment = await userCollection.findOne({ email: email });
    if (userComment === null) throw 'No user with that email';
    const updateInfo = await userCollection.updateOne({ email: email }, { $addToSet: { reviewComments: commentId } });
    if (!updateInfo.matchedCount && !updateInfo.modifiedCount) throw 'Update failed';

    return userComment;
}

module.exports = { addUser, getAllUsers, getUser, getUserById, addUserSeed, updateUser, addReviewsToUser, addCommentsToUser };
