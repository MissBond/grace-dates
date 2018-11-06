const router = require('express').Router()
const {Celebrity, Activity, Review, User} = require('../db/models')
module.exports = router

router.use('/:celebrityId/reviews', require('./reviews'))

// const guard = (req, res, next) => {
//   switch (req.path) {
//     case '/':
//     case '/:celebrityId/':
//     case '/:celebrityId/reviews':
//       if (req.method === 'GET') {
//         return next();
//       } else if (req.user && req.user.isAdmin && req.method !== 'GET') {
//         return next()
//       } else {
//         res.status(403).send('Forbidden')
//       }
//       break;
//     default:
//       break
//     }
//   }


// router.use(guard)


router.get('/', async (req, res, next) => {
  try {
    const celebrities = await Celebrity.findAll()
    res.json(celebrities)
  } catch (err) {
    next(err)
  }
})

router.get('/:celebrityId', async (req, res, next) => {
  try {
    const celebrityId = req.params.celebrityId
    const celebrity = await Celebrity.findById(celebrityId, {
      include: [Activity]
    })
    res.json(celebrity)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const newCelebrity = await Celebrity.create(req.body)
    res.json(newCelebrity)
  } catch (err) {
    next(err)
  }
})

router.put('/:celebrityId', async (req, res, next) => {
  try {
    const celebrityId = req.params.celebrityId
    const updates = req.body
    const celebrityToUpdate = await Celebrity.findById(celebrityId, {
      include: [Activity]
    })
    if (celebrityToUpdate === null) {
      res.status(404).send()
    } else {
      const updatedCelebrity = await celebrityToUpdate.update(updates)

      res.json(updatedCelebrity)
    }
  } catch (err) {
    next(err)
  }
})

router.delete('/:celebrityId', async (req, res, next) => {
  try {
    await Celebrity.destroy({
      where: {id: req.params.celebrityId}
    })
    res.status(204).end()
  } catch (err) {
    next(err)
  }
})

//user reviews routes
router.get('/:celebrityId/reviews', async (req, res, next) => {
  try {
    const reviews = await Review.findAll({
      where: {
        celebrityId: req.params.celebrityId
      },
        include: [{model: User}]
      
    })
    res.json(reviews)
  } catch (error) {
    next(error)
  }
})

router.post('/:celebrityId/reviews', async (req, res, next) => {
  try {
    const newReview = await Review.create(req.body)
    res.json(newReview)
  } catch (error) {
    next(error)
  }
})
