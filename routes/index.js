const homeRoute = require('./home');
const gameRoute = require('./games');
const userRoute = require('./user');

const constructorMethod = (app) => {
    app.use('/', homeRoute);
    app.use('/user', userRoute);
    app.use('/games', gameRoute);

    app.use('*', (req,res) => {
        res.redirect('/');
    });
};

module.exports = constructorMethod;