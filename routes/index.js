const router = require('express').Router();

router.use('/', require('./swagger'));

router.get('/', (req, res) => {
  res.send('Hello World! Contacts API. Visit /api-docs for Swagger documentation.');
});

router.use('/contacts', require('./contacts'));

module.exports = router;