const express = require('express');
const router = express.Router();

router.get('/test', (req, res) => {
    res.send("Donny Hayes");
});

router.use('/contacts', require('./contacts'))

module.exports = router;