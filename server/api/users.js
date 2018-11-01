const router = require('express').Router()
const {User, Order, CelebrityOrder, Celebrity} = require('../db/models')
module.exports = router

// router.use('/:userId/orders', require('./orders'))

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:userId', async (req, res, next) => {
  try {
    const user = await User.findById(+req.params.userId, {
      attributes: ['id', 'email'],
      include: [Order]
    })
    if (user.orders.length) {
      res.json(user)
    } else {
      await Order.create({userId: user.id})
      const updatedUser = await User.findById(+req.params.userId, {
        attributes: ['id', 'email'],
        include: [Order]
      })
      res.json(updatedUser)
    }
  } catch (err) {
    next(err)
  }
})

router.delete('/:userId', function(req, res, next) {
  User.destroy({
    where: {
      id: req.params.userId
    }
  })
    .then(() => {
      res.sendStatus(204)
    })
    .catch(next)
})

router.put('/:userId', async (req, res, next) => {
  try {
    const updatedUser = await User.findById(+req.params.userId)
    await updatedUser.update({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      displayName: req.body.displayName,
      email: req.body.email,
      isAdmin: req.body.isAdmin
    })
    res.json(updatedUser)
  } catch (err) {
    next(err)
  }
})

//orders

router.get('/:userId/orders', async (req, res, next) => {
  try {
    console.log(req.params)
    const orders = await Order.findAll({
      where: {userId: req.params.userId},
      include: [{model: Celebrity}]
    })
    res.json(orders)
  } catch (err) {
    next(err)
  }
})

router.get('/:userId/orders/:orderId', async (req, res, next) => {
  try {
    console.log(req.params)
    const orders = await Order.findById(req.params.orderId, {
      include: [{model: Celebrity}]
    })
    res.json(orders)
  } catch (err) {
    next(err)
  }
})

// router.post('/:userId/orders', async (req, res, next) => {
//   try {
//     const userId = req.params.userId
//     const newOrder = await Order.create({userId: userId})
//     res.json(newOrder)
//   } catch (err) {
//     next(err)
//   }
// })

//to change an order to completed

router.put('/:userId/orders/:orderId', async (req, res, next) => {
  try {
    const orderId = req.params.orderId
    const userId = req.params.userId
    const updates = req.body
    const orderToUpdate = await Order.findById(orderId)
    await orderToUpdate.update(updates)
    const newOrder = await Order.create({userId: userId})
    res.json(newOrder)
  } catch (err) {
    next(err)
  }
})

router.put('/:userId/orders/:orderId/celebrities', async (req, res, next) => {
  try {
    const orderId = req.params.orderId
    const updates = req.body
    const orderToUpdate = await Order.findById(orderId, {
      include:[{Model: Celebrity}]
    })
    const updatedOrder = await orderToUpdate.update(updates)
    res.json(updatedOrder)
  } catch (err) {
    next(err)
  }
})

