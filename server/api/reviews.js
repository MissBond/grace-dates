const router = require('express').Router()
const {Review} = require('../db/models')
module.exports = router

router.get('/reviews', async (req, res, next) => {
  try {
    const reviews = await Review.findAll({
        where: {celebrityId: req.params.celebrityId}
    })
    res.json(reviews)
  } catch (err) {
    next(err)
  }
})

router.get('/:reviewId', async (req, res, next) => {
  try {
    const reviewId = req.params.reviewId
    const review = await Review.findById(reviewId)
    res.json(review)
  } catch (err) {
    next(err)
  }
})

router.post('/:celebrityID/', async (req, res, next) => {
  try {
    const newReview = await Review.create(req.body)
    res.json(newReview)
  } catch (err) {
    next(err)
  }
})

router.put('/:reviewId', async (req, res, next) => {
  try {
    const reviewId = req.params.reviewId
    const updates = req.body
    const reviewToUpdate = await Review.findById(reviewId)
    if (reviewToUpdate === null) {
      res.status(404).send()
    } else {
      const updatedReview = await reviewToUpdate.update(updates)
      res.json(updatedReview)
    }
  } catch (err) {
    next(err)
  }
})

router.delete('/:reviewId', async (req, res, next) => {
  try {
    await Review.destroy({
      where: {id: req.params.reviewId}
    })
    res.status(204).end()
  } catch (err) {
    next(err)
  }
})
