const dbConnection = require('../config/mongoConnection');
const data = require('../data');
const games = data.games;
const user = data.user;

const connection = require('../config/mongoConnection');
async function main(){
	try{
		await games.addGame("The Legend of Zelda A Link to the Past","The Legend of Zelda A Link to the Past.jpg");
		await games.addGame("Portal 2","Portal 2.jpg");
		await games.addGame("Super Metroid","Super Metroid.jpg");
		await games.addGame("The Legend of Zelda Breath of the Wild","The Legend of Zelda Breath of the Wild.jpg");
		await games.addGame("Super Mario Bros. 3","Super Mario Bros. 3.jpg");
		await games.addGame("Tetris 99","Tetris99.jpg");
		await games.addGame("Half-Life 2","Half-Life 2.jpg");
		await games.addGame("Red Dead Redemption 2","Red Dead Redemption2.jpg");
		await games.addGame("Super Mario 64","Super Mario 64.jpg");
		await games.addGame("Grand Theft Auto V", "Grand Theft Auto V.jpg");
		await games.addGame("Animal Crossing New Horizons", "ACNH.png");
		await games.addGame("Halo 5", "Halo 5.jpg");
		await games.addGame("Nioh 2", "Nioh 2.jpg");
		await games.addGame("Dark Souls 3", "Dark Souls3.jpg");
		await games.addGame("Portal", "Portal.jpg");
		await games.addGame("Chrono Trigger", "Chrono Trigger.jpg");
		await games.addGame("Doom", "Doom.jpg");
		await games.addGame("The Last of Us", "The Last of Us.jpg");
		await games.addGame("Super Mario Odyssey", "Super Mario Odyssey.jpg");

		await user.addUserSeed("Jane","Doe","janedoe@gmail.com","$2a$16$3eiILObl9M5qN8CzPYArau4p5SFyAjNexctMDlamH1jxVgBPmsIdi");
	  	await user.addUserSeed("Pascal","Clifford","pclifford2@angelfire.com","$2a$16$Bhop3tLEwnjUztZX2U9iCO6T1ODBEJyRAPrGrLVPcb3oGUkskvX6G");
	  	await user.addUserSeed("Kristin","Duffus","kduffus4@craigslist.org","$2a$16$32cJ3Mo4eVDjS5CNpyU4U.fX3L0ymNBEDojal5kTAEttqVPQyyRc6");
	  	await user.addUserSeed("Theo","Longo","tlongo5@fema.gov","$2a$16$shV1LpLoZvDcEqVKmx/sQuxwQwshINLsPMTqEvFp996tOk9uduSVy");
	  	await user.addUserSeed("Vin","Copson","Vcopson4@wufoo.com","$2a$16$fXqeuI6NMdFhX.9ux6aPEOfA2JkSOb28Ix6or8EhNW7tcMtiykDGi");
	}
	catch(e){
		console.log(e);
	}
	
	const db = await connection();
	await db.serverConfig.close();
	
	console.log('Done!');
} 

main().catch((error) => {
	console.error(error);
	return dbConnection().then((db) =>{
		return db.serverConfig.close();
	});
});
