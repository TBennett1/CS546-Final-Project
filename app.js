const express = require("express");
const session = require('express-session');
const app = express();
const configRoutes = require("./routes");
const Handlebars = require('handlebars');
const static = express.static(__dirname + '/public');
const exphbs = require('express-handlebars');

app.use('/public', static);
app.use(express.static('./images'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use(session({
  name: 'Test',
  secret: "This is a secret.. shhh don't tell anyone",
  resave: false,
  saveUninitialized: true
}));

app.use('/private', function (req, res, next) {
  if(!req.session.user){
      res.status(403);
      res.render('user',{});
  }
  else{
      next();
  }
});

app.use( function (req, res, next) {
  time = new Date().toUTCString();
  if(req.session.user){
      console.log("[" + time + "] " + req.method + " " + req.originalUrl + " (Authenticated User)");
  }
  else{
      console.log("[" + time + "] " + req.method + " " + req.originalUrl + " (Non-Authenticated User)");
  }
  console.log(req.session);
  next();
});
//Added Helper function to remove whitespaces from href
Handlebars.registerHelper('loud', function (aString) {
  return aString.replace(/\s/gi,"_");
});
//
configRoutes(app);

try{
  app.listen(3000, () => {
    console.log("We've now got a server!");
    console.log("Your routes will be running on http://localhost:3000");
  });
}
catch(e){
  console.log(e);
}
