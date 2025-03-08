const router= require('express').Router();

// Define your routes here
router.get('/', (req, res) => {
    res.send('Welcome to the home page!');
});

router.get('/about', (req, res) => {
    res.send('About us page');
});


router.use('/users', require('./users'));
module.exports = router;