const dbConnection = require('../config/mongoConnection');
const data = require('../data');
const games = data.games;
const users = data.users;
const reviews = data.reviews;
const comments = data.comments;

const connection = require('../config/mongoConnection');
async function main(){
	try{
		await games.addGame("The Legend of Zelda A Link to the Past","TheLegendofZeldaALinktothePast.jpg");
		await games.addGame("Portal 2","Portal2.jpg");
		await games.addGame("Super Metroid","SuperMetroid.jpg");
		let createdGame5 = await games.addGame("The Legend of Zelda Breath of the Wild","TheLegendofZeldaBreathoftheWild.jpg");
		await games.addGame("Super Mario Bros. 3","SuperMarioBros3.jpg");
		await games.addGame("Tetris 99","Tetris99.jpg");
		await games.addGame("Half-Life 2","HalfLife2.jpg");
		await games.addGame("Red Dead Redemption 2","RedDeadRedemption2.jpg");
		await games.addGame("Super Mario 64","SuperMario64.jpg");
		await games.addGame("Grand Theft Auto V", "GrandTheftAutoV.jpg");
		await games.addGame("Animal Crossing New Horizons", "ACNH.png");
		await games.addGame("Halo 5", "Halo5.jpg");
		await games.addGame("Nioh 2", "Nioh2.jpg");
		await games.addGame("Dark Souls 3", "DarkSouls3.jpg");
		await games.addGame("Portal", "Portal.jpg");
		await games.addGame("Chrono Trigger", "ChronoTrigger.jpg");
		await games.addGame("Doom", "Doom.jpg");
		await games.addGame("The Last of Us", "TheLastofUs.jpg");
		await games.addGame("Super Mario Odyssey", "SuperMarioOdyssey.jpg");

		await users.addUserSeed("Jane","Doe","janedoe@gmail.com","$2a$16$3eiILObl9M5qN8CzPYArau4p5SFyAjNexctMDlamH1jxVgBPmsIdi");
		await users.addUserSeed("Pascal","Clifford","pclifford2@angelfire.com","$2a$16$Bhop3tLEwnjUztZX2U9iCO6T1ODBEJyRAPrGrLVPcb3oGUkskvX6G");
		await users.addUserSeed("Kristin","Duffus","kduffus4@craigslist.org","$2a$16$32cJ3Mo4eVDjS5CNpyU4U.fX3L0ymNBEDojal5kTAEttqVPQyyRc6");
		await users.addUserSeed("Theo","Longo","tlongo5@fema.gov","$2a$16$shV1LpLoZvDcEqVKmx/sQuxwQwshINLsPMTqEvFp996tOk9uduSVy");
		await users.addUserSeed("Vin","Copson","Vcopson4@wufoo.com","$2a$16$fXqeuI6NMdFhX.9ux6aPEOfA2JkSOb28Ix6or8EhNW7tcMtiykDGi");
		
		let review1=await reviews.addReview(`${createdGame5.nameOfGame}`,"tlOngo5@fema.gov","Fun to play", 9);
		let review2=await reviews.addReview(`${createdGame5.nameOfGame}`,"janedoe@gmail.com","great", 8);

		comment1=await comments.addComment(`${createdGame5.nameOfGame}`,`${review1._id}`,"tlongo5@fema.gov","Good suggestion!");
		comment2=await comments.addComment(`${createdGame5.nameOfGame}`,`${review1._id}`,"janedoe@gmail.com","I am a dummy comment!");	
		
		downvote1=await reviews.downVote(`${review1._id}`,"tlongo5@fema.gov");
		upvote1=await reviews.upVote(`${review1._id}`,"janedoe@gmail.com");
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
