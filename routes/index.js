const bcrypt = require('bcrypt');
const userData = require('../data/users');


const constructorMethod = app => {
    app.get("/", (req, res) => {
        if (req.session.user) {
            return res.redirect('index',{loggedin: true});
        }
        else{
            res.render('index',{loggedin: false});
        }

});
    app.get("/login", (req, res) => {
        res.render('login',{title: 'Login'});
    });
    app.post("/login", async (req, res) => {
        const data = req.body;
        if(!data || !data.username || !data.password){
            res.status(400);
            return;
        }
        
        data.username = data.username.toLowerCase();
        try{
            let success = false;
            const user = userData.find(u => u.username === data.username);
            if(user){
                success = await bcrypt.compare(data.password, user.hashedPassword);
        
                if(success=== true){
                    //Worked~
                    req.session.user = user;
                    req.session.AuthCookie = req.sessionID;
                    return res.redirect('/private')
                }
                else{
                    res.status(401).render('login', {title: 'Login', error: true, etext: "Invalid Password" });
                    console.log("You messed up bro");
                }
            }
            else{
                res.status(401).render('login', {title: 'Login', error: true, etext: "Invalid username" });
                console.log("You messed up bro");
            }
        }
        catch{
            res.status(404).json({ error: true });
        }
    });

    app.get("/private", (req, res) => {
       if(req.session.user){
           req.session.user.log = true;
           res.render('index',{loggedin: true, currentUser: req.session.user.username});
       }
    });
    app.get("/logout", (req, res) => {
        if(req.session.user){
        req.session.destroy();
        res.clearCookie('AuthCookie');
        res.render('logout',{});
        }
        else{
             res.redirect('/');
        }
    });

};

module.exports = constructorMethod;