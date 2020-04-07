const dbConnection = require('../config/mongoConnection');
const data = require('../data/');
const games = require('../data/games');
//const images=require('../images/');
const bluebird = require("bluebird");
//const Promise = bluebird.Promise;

const fs = bluebird.promisifyAll(require("fs"));
//
//var fs = require('fs');
//
const connection = require('../config/mongoConnection');
async function main(){
	//Creation of Game 1
	let createdGame1;
	gameIcon1=fs.readFileAsync("../images/Super Mario World.jpg");


try{
	   createdGame1 = await games.addGame("Super Mario World",gameIcon1);
	 
	   console.log("This is the first game: Game No 1:");
	   createdGame2=await games.addGame("The Legend of Zelda A Link to the Past",fs.readFileAsync("../images/The Legend of Zelda A Link to the Past.jpg"));
	   createdGame3=await games.addGame("Portal 2",fs.readFileAsync("../images/Portal 2.jpg"));
	   createdGame4=await games.addGame("Super Metroid",fs.readFileAsync("../images/Super Metroid.jpg"));
	   createdGame5=await games.addGame("The Legend of Zelda Breath of the Wild",fs.readFileAsync("../images/The Legend of Zelda Breath of the Wild.jpg"));
	   createdGame6=await games.addGame("Super Mario Bros. 3",fs.readFileAsync("../images/Super Mario Bros. 3.jpg"));
	   createdGame7=await games.addGame("Tetris",fs.readFileAsync("../images/Tetris.jpg"));
	   createdGame8=await games.addGame("Half-Life 2",fs.readFileAsync("../images/Half-Life 2.jpg"));
	   createdGame9=await games.addGame("Red Dead Redemption",fs.readFileAsync("../images/Red Dead Redemption.jpg"));
	   createdGame10=await games.addGame("Super Mario 64",fs.readFileAsync("../images/Super Mario 64.jpg"));
	   createdGame11=await games.addGame("Grand Theft Auto V",fs.readFileAsync("../images/Grand Theft Auto V.jpg"));
	   createdGame12=await games.addGame("Castlevania Symphony of the Night",fs.readFileAsync("../images/Castlevania Symphony of the Night.png"));
	   createdGame13=await games.addGame("Halo 2",fs.readFileAsync("../images/Halo 2.jpg"));
	   createdGame14=await games.addGame("Super Mario Bros.",fs.readFileAsync("../images/Super Mario Bros..jpg"));
	   createdGame15=await games.addGame("Street Fighter II",fs.readFileAsync("../images/Street Fighter II.jpg"));
	   createdGame16=await games.addGame("Dark Souls",fs.readFileAsync("../images/Dark Souls.jpg"));
	   createdGame17=await games.addGame("Portal",fs.readFileAsync("../images/Portal.jpg"));
	   createdGame18=await games.addGame("Chrono Trigger",fs.readFileAsync("../images/Chrono Trigger.jpg"));
	   createdGame19=await games.addGame("Doom",fs.readFileAsync("../images/Doom.jpg"));
	   createdGame20=await games.addGame("The Last of Us",fs.readFileAsync("../images/The Last of Us.jpg"));
	   
	  //console.log(createdGame1);
	}
	catch(e){
		console.log(e);
	}
	
	   const db = await connection();
	   await db.serverConfig.close();
	 
	   console.log('Done!');
	} 

main().catch(console.log);
