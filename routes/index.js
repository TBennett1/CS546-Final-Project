const homeRoute = require('./home');
const login = require('./login');
const logout = require('./logout');
const searchResults = require('./searchresults');
const gameRoute = require('./games');
const userRoute = require('./user');

const constructorMethod = (app) => {
    app.use('/', homeRoute);
    app.use('/login', login);
    app.use('/logout', logout);
    app.use('/searchresults', searchResults);
    app.use('/games', gameRoute);
    app.use('/user', userRoute);

    app.use('*', (req, res) => {
        res.redirect('/');
    });
};

module.exports = constructorMethod;