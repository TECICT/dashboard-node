var router = require('express').Router();

router.use('/video', require('./video'));
router.use('/settings', require('./settings'));
router.use('/weather', require('./weather'));
router.use('/news', require('./news'));
router.use('/', require('./users'));
router.use('/lists', require('./lists'));
router.use('/listtype', require('./listType'));

module.exports = router;