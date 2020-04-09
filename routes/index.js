const homeRoute = require('./home');
const SMG2Route = require('./smg2');
// const gameRoute = require('./games');

const constructorMethod = (app) => {
    app.use('/', homeRoute);
    app.use('/supermariogalaxy2', SMG2Route);
    // app.use('/games', gameRoute);

    app.use('*', (req,res) => {
        res.redirect('/');
    });
};

module.exports = constructorMethod;