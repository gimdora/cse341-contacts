const router = require('express').Router();

router.get('/', (req, res) => {
  res.send('Hello World! Contacts API is running. Try /contacts');
});

router.use('/contacts', require('./contacts'));

module.exports = router;
