const homeRoute = require('./home');
const login = require('./login');
const logout = require('./logout');
const searchResults = require('./searchresults');
const gameRoute = require('./games');
const userRoute = require('./user');
const signUp = require('./signup');
const signUpSuccess = require('./signupsuccess');

const constructorMethod = (app) => {
    app.use('/', homeRoute);
    app.use('/login', login);
    app.use('/logout', logout);
    app.use('/searchresults', searchResults);
    app.use('/games', gameRoute);
    app.use('/user', userRoute);
    app.use('/signup', signUp);
    app.use('/signupsuccess', signUpSuccess);

    app.use('*', (req, res) => {
        console.log('redirecting...');
        
        res.redirect('/');
    });
};

module.exports = constructorMethod;
