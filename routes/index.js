const routes = require('express').Router();

routes.get('/', (req, res) => {
    res.send('Donny Hayes');
});

module.exports = routes;