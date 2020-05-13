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
		const createdGame7=await games.addGame("Tetris 99","Tetris99.jpg");
		await games.addGame("Half-Life 2","HalfLife2.jpg");
		await games.addGame("Red Dead Redemption 2","RedDeadRedemption2.jpg");
		await games.addGame("Super Mario 64","SuperMario64.jpg");
		await games.addGame("Grand Theft Auto V", "GrandTheftAutoV.jpg");
		const createdGame12=await games.addGame("Animal Crossing New Horizons", "ACNH.png");
		await games.addGame("Halo 5", "Halo5.jpg");
		await games.addGame("Nioh 2", "Nioh2.jpg");
		await games.addGame("Dark Souls 3", "DarkSouls3.jpg");
		const createdGame15=await games.addGame("Portal", "Portal.jpg");
		await games.addGame("Chrono Trigger", "ChronoTrigger.jpg");
		const createdGame17=await games.addGame("DOOM", "Doom.jpg");
		await games.addGame("The Last of Us", "TheLastofUs.jpg");
		await games.addGame("Super Mario Odyssey", "SuperMarioOdyssey.jpg");
		const createdGame20=await games.addGame("DOOM Eternal", "DOOMEternal.jpg");

		await users.addUserSeed("Jane","Doe","janedoe@gmail.com","$2a$16$3eiILObl9M5qN8CzPYArau4p5SFyAjNexctMDlamH1jxVgBPmsIdi", "pic.png");
		await users.addUserSeed("Pascal","Clifford","pclifford2@angelfire.com","$2a$16$Bhop3tLEwnjUztZX2U9iCO6T1ODBEJyRAPrGrLVPcb3oGUkskvX6G", "pascal.jpg");
		await users.addUserSeed("Kristin","Duffus","kduffus4@craigslist.org","$2a$16$32cJ3Mo4eVDjS5CNpyU4U.fX3L0ymNBEDojal5kTAEttqVPQyyRc6", "kristin.jpeg");
		await users.addUserSeed("Theo","Longo","tlongo5@fema.gov","$2a$16$shV1LpLoZvDcEqVKmx/sQuxwQwshINLsPMTqEvFp996tOk9uduSVy", "theo.jpg");
		await users.addUserSeed("Vin","Copson","Vcopson4@wufoo.com","$2a$16$fXqeuI6NMdFhX.9ux6aPEOfA2JkSOb28Ix6or8EhNW7tcMtiykDGi", "vin.png");
		
		let review1=await reviews.addReview(`${createdGame5.nameOfGame}`,"tlOngo5@fema.gov","It is just barely worth it the first time, let alone a game you might actually come back to.", 4);
		let review2=await reviews.addReview(`${createdGame5.nameOfGame}`,"janedoe@gmail.com","Legend Of Zelda Breath of the wild delivers some goofy laughs with family or friends as you fumble your way to a destination without completely destroying your cargo, but like a package that’s been bashed into your front door a few times before finally being pushed through your mail slot, it’s noticeably rough around the edges and some of its contents are broken.", 8);
		const review3=await reviews.addReview(`${createdGame7.nameOfGame}`,"kduffus4@craigslist.org","Considering its 15-hour length, Tetris would likely have benefitted from having the bulk of its more basic brain teasers trimmed.",5);
		const review4=await reviews.addReview(`${createdGame12.nameOfGame}`,"Vcopson4@wufoo.com","The Legend of Zelda, Pokemon, and Super Mario each found new life on the Nintendo Switch, and following those games in kind is Animal Crossing: New Horizons: An expanded, polished, next-generation reboot of a classic Nintendo game.",9);
		const review5=await reviews.addReview(`${createdGame17.nameOfGame}`,"tlOngo5@fema.gov","Hell no! The demon outbreak is a result of worst business plan of all time.",4);
		const review6=await reviews.addReview(`${createdGame15.nameOfGame}`,"janedoe@gmail.com","For 20 dollars, it may be a little pricey for what’s there, but we certainly won't tell anybody not to buy Portal. ",9);
		const review7=await reviews.addReview(`${createdGame15.nameOfGame}`,"Vcopson4@wufoo.com","It’s hard to say no to another peek into this awesome universe and it does fit together with Episode Two.",10);
		const review8=await reviews.addReview(`${createdGame12.nameOfGame}`,"tlOngo5@fema.gov"," I cannot wait to see what's to come: Seeing cool custom islands from the community, special events, season changes. It took too long to get to the most exciting part of my island renovation (until I cheated), but now that all of New Horizons is spread before me, I have plenty to do, big plans for my island, and so much to look forward to.",8);
		const review9=await reviews.addReview(`${createdGame20.nameOfGame}`,"janedoe@gmail.com","I would definitely buy this game.",7);


		const comment1=await comments.addComment(`${createdGame5.nameOfGame}`,`${review1._id}`,"tlongo5@fema.gov","Good suggestion!");
		const comment2=await comments.addComment(`${createdGame5.nameOfGame}`,`${review1._id}`,"janedoe@gmail.com","I dont agree with you,complete waste of money!");	
		const comment3=await comments.addComment(`${createdGame20.nameOfGame}`,`${review9._id}`,"Vcopson4@wufoo.com","Yup, completely agree.");
		const comment4=await comments.addComment(`${createdGame17.nameOfGame}`,`${review5._id}`,"janedoe@gmail.com","You saved my money!");

		downvote1=await reviews.downVote(`${review1._id}`,"tlongo5@fema.gov");
		upvote1=await reviews.upVote(`${review1._id}`,"janedoe@gmail.com");
		downvote2=await reviews.downVote(`${review3._id}`,"tlongo5@fema.gov");
		upvote2=await reviews.upVote(`${review8._id}`,"kduffus4@craigslist.org");
		upvote1=await reviews.upVote(`${review9._id}`,"Vcopson4@wufoo.com");
		upvote1=await reviews.upVote(`${review5._id}`,"janedoe@gmail.com");
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
