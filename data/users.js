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

module.exports={addUser,getAllUsers,getUser,addUserSeed,updateUser,addReviewsToUser, }
module.exports = [
  {
    _id: 0,
    username: "masterdetective123",
    hashedPassword: "$2a$16$7JKSiEmoP3GNDSalogqgPu0sUbwder7CAN/5wnvCWe6xCKAKwlTD.",
    firstName: "Sherlock",
    lastName: "Holmes",
    Bio: "Sherlock Holmes (/ˈʃɜːrlɒk ˈhoʊmz/) is a fictional private detective created by British author Sir Arthur Conan Doyle. Known as a 'consulting detective' in the stories, Holmes is known for a proficiency with observation, forensic science, and logical reasoning that borders on the fantastic, which he employs when investigating cases for a wide variety of clients, including Scotland Yard.",
    Profession: "Detective"

  }, // etc, dont forget the other data
  {
    _id: 1,
    username: "lemon",
    hashedPassword: "$2a$16$SsR2TGPD24nfBpyRlBzINeGU61AH0Yo/CbgfOlU1ajpjnPuiQaiDm",
    firstName: "Elizabeth",
    lastName: "Lemon",
    Bio:"Elizabeth Miervaldis 'Liz' Lemon is the main character of the American television series 30 Rock. She created and writes for the fictional comedy-sketch show The Girlie Show or TGS with Tracy Jordan.",
    Profession: 'Writer'
  },
  {
      _id: 2,
      username: "theboywholived",
      hashedPassword: "$2a$16$4o0WWtrq.ZefEmEbijNCGukCezqWTqz1VWlPm/xnaLM8d3WlS5pnK",
      firstName: "Harry",
      lastName: "Potter",
      Bio: "Harry Potter is a series of fantasy novels written by British author J. K. Rowling. The novels chronicle the life of a young wizard, Harry Potter, and his friends Hermione Granger and Ron Weasley, all of whom are students at Hogwarts School of Witchcraft and Wizardry . The main story arc concerns Harry's struggle against Lord Voldemort, a dark wizard who intends to become immortal, overthrow the wizard governing body known as the Ministry of Magic, and subjugate all wizards and Muggles.",
      Profession: 'Student'
    },// etc, dont forget the other data

    
];