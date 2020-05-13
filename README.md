# Game ON

This is a group project for CS 546 Web Programming I @ Stevens Institute of Technology

Group Members: Tehreem Tungekar, Matthew Dimaculangan, Tarquin Bennett

This is a Video Game Reviewer application which is written in Node.js and it uses MongoDB that allows authorized users to post reviews and ratings for video games.
Users can also comment on reviews. If a user has not created a profile, he/she can still view the reviews.

How to setup and use this app

1: Getting started with Game ON app

Before running the app you need to run node seed.js in the tasks folder to create a list of games and a set of users who have posted a few reviews and comments
Then you can start the app using the command 'npm start'

2: Sign Up

Signing up is pretty simple!
You need to provide your email address, first name, last name and also create a password.
After registered as a user, you can review/rate a game or can comment on other reviews in the app.
You can edit your profile by selecting 'Edit Profile' anytime you want.
You can also edit the reviews/ratings posted by you.

3: Log in

Once you are logged out, you have to login using your username and password.

4: Search games

You can search games by keyword through search bar.

GAME ON is very secure. We have used hashed passwords to seed the database, so you can use these credentials to log in:


User 1:janedoe@gmail.com
Password:IvjcMwcCv
Hashed Password: $2a$16$3eiILObl9M5qN8CzPYArau4p5SFyAjNexctMDlamH1jxVgBPmsIdi

User 2:pclifford2@angelfire.com
Password:sDvVrDQQnJ
Hashed Password:$2a$16$Bhop3tLEwnjUztZX2U9iCO6T1ODBEJyRAPrGrLVPcb3oGUkskvX6G

User 3:kduffus4@craigslist.org
Password:HSQWqqtu
Hashed Password:$2a$16$32cJ3Mo4eVDjS5CNpyU4U.fX3L0ymNBEDojal5kTAEttqVPQyyRc6

User 4:tlongo5@fema.gov
Password:apeJFa 
Hashed Password:$2a$16$shV1LpLoZvDcEqVKmx/sQuxwQwshINLsPMTqEvFp996tOk9uduSVy

User 5:vcopson4@wufoo.com
Password:TDOEc0Qcg
Hashed Password:$2a$16$fXqeuI6NMdFhX.9ux6aPEOfA2JkSOb28Ix6or8EhNW7tcMtiykDGi
