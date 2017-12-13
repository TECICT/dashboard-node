var router = require('express').Router();

router.use('/video', require('./video'));
router.use('/settings', require('./settings'));
router.use('/weather', require('./weather'));
router.use('/news', require('./news'));

module.exports = router;