const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/activities', require('./activities'))
router.use('/celebrities', require('./celebrities'))
router.use('/promocodes', require('./promoCodes'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
