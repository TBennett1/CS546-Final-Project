const homeRoute = require('./home');
const SMG2Route = require('./smg2');
const login = require('./login');
const logout = require('./logout');
const searchResults = require('./searchresults');
// const gameRoute = require('./games');

const constructorMethod = (app) => {
    app.use('/', homeRoute);
    app.use('/supermariogalaxy2', SMG2Route);
    app.use('/login', login);
    app.use('/logout', logout);
    app.use('/searchresults', searchResults);
    // app.use('/games', gameRoute);

    app.use('*', (req, res) => {
        res.redirect('/');
    });
};

module.exports = constructorMethod;