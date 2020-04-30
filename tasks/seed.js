//const dbConnection = require('../config/mongoConnection');
//const data = require('../data/');
const games = require('../data/games');
//const images=require('../images/');
//const bluebird = require("bluebird");
//const Promise = bluebird.Promise;
const users=require('../data/users');
//const fs = bluebird.promisifyAll(require("fs"));
const reviews=require('../data/reviews');

const connection = require('../config/mongoConnection');
async function main(){
	//Creation of Game 1
	let createdGame1;
	//gameIcon1=fs.createWriteStream("../images/Super Mario World.jpg");


try{
	
	//Created 20 games:
	   createdGame1 = await games.addGame("Super Mario World","../images/Super Mario World.jpg");
	   console.log("This is the first game: Game No 1:");
	   createdGame2=await games.addGame("The Legend of Zelda A Link to the Past","../images/The Legend of Zelda A Link to the Past.jpg");
	   createdGame3=await games.addGame("Portal 2","../images/Portal 2.jpg");
	   createdGame4=await games.addGame("Super Metroid","../images/Super Metroid.jpg");
	   createdGame5=await games.addGame("The Legend of Zelda Breath of the Wild","../images/The Legend of Zelda Breath of the Wild.jpg");
	   createdGame6=await games.addGame("Super Mario Bros. 3","../images/Super Mario Bros. 3.jpg");
	   createdGame7=await games.addGame("Tetris","../images/Tetris.jpg");
	   createdGame8=await games.addGame("Half-Life 2","../images/Half-Life 2.jpg");
	   createdGame9=await games.addGame("Red Dead Redemption","../images/Red Dead Redemption.jpg");
	   createdGame10=await games.addGame("Super Mario 64","../images/Super Mario 64.jpg");
	   createdGame11=await games.addGame("Grand Theft Auto V", "../images/Grand Theft Auto V.jpg");
	   createdGame12=await games.addGame("Castlevania Symphony of the Night", "../images/Castlevania Symphony of the Night.png");
	   createdGame13=await games.addGame("Halo 2", "../images/Halo 2.jpg");
	   createdGame14=await games.addGame("Super Mario Bros.", "../images/Super Mario Bros..jpg");
	   createdGame15=await games.addGame("Street Fighter II", "../images/Street Fighter II.jpg");
	   createdGame16=await games.addGame("Dark Souls", "../images/Dark Souls.jpg");
	   createdGame17=await games.addGame("Portal", "../images/Portal.jpg");
	   createdGame18=await games.addGame("Chrono Trigger", "../images/Chrono Trigger.jpg");
	   createdGame19=await games.addGame("Doom", "../images/Doom.jpg");
	   createdGame20=await games.addGame("The Last of Us", "../images/The Last of Us.jpg");
	   
	  //console.log(createdGame1);
	  // Added 5 users in database:
	  user1=await users.addUserSeed("Jane","Doe","janedoe@gmail.com","$2a$16$3eiILObl9M5qN8CzPYArau4p5SFyAjNexctMDlamH1jxVgBPmsIdi");
	  user2=await users.addUserSeed("Pascal","Clifford","pclifford2@angelfire.com","$2a$16$Bhop3tLEwnjUztZX2U9iCO6T1ODBEJyRAPrGrLVPcb3oGUkskvX6G");
	  user3=await users.addUserSeed("Kristin","Duffus","kduffus4@craigslist.org","$2a$16$32cJ3Mo4eVDjS5CNpyU4U.fX3L0ymNBEDojal5kTAEttqVPQyyRc6");
	  user4=await users.addUserSeed("Theo","Longo","tlongo5@fema.gov","$2a$16$shV1LpLoZvDcEqVKmx/sQuxwQwshINLsPMTqEvFp996tOk9uduSVy");
	  user5=await users.addUserSeed("Vin","Copson","vcopson4@wufoo.com","$2a$16$fXqeuI6NMdFhX.9ux6aPEOfA2JkSOb28Ix6or8EhNW7tcMtiykDGi");
	
	//Testing update user function:
	//x=await users.updateUser("tlongo5@fema.gov","lol","mkivbn","nnjukikl");
	//console.log(x);
	
	review1=await reviews.addReview("5eaae6a1db97bc28e0603348","tlOngo5@fema.gov","Fun to play",9);
	console.log(review1);
	}
	catch(e){
		console.log(e);
	}
	
	   const db = await connection();
	   await db.serverConfig.close();
	 
	   console.log('Done!');
	} 

main().catch(console.log);
