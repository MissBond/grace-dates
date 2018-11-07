const router = require('express').Router()
const {
  User,
  Order,
  CelebrityOrder,
  Celebrity,
  PromoCodeUser
} = require('../db/models')
module.exports = router

//users route protection

const getUsersGuard = (req, res, next) => {
    //only Admins can view all users
    if (req.user && req.user.isAdmin) {
      return next()
    } else {
      res
        .status(403)
        .send('Forbidden')
    }
  }

const getOneUserGuard = (req, res, next) => {
  if (req.user && (req.user.isAdmin || +req.user.id === +req.params.userId)) {
    return next()
  } else {
    res.status(403).send('Forbidden')
  }
}

const deleteUserGuard = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    return next()
  } else {
    res.status(403).send('Forbidden')
  }
}

const updateUserGuard = (req, res, next) => {
  if (req.user && (req.user.isAdmin || +req.user.id === +req.params.userId)) {
    return next()
  } else {
    res.status(403).send('Forbidden')
  }
}

const getUserOrdersGuard = (req, res, next) => {
  if (req.user && (req.user.isAdmin || +req.user.id === +req.params.userId)) {
    return next()
  } else {
    res.status(403).send('Forbidden')
  }
}

const updateUserOrderGuard = (req, res, next) => {
  if (req.user && req.user.isAdmin || +req.user.id === +req.params.userId) {
    return next()
  } else {
    res.status(403).send('Forbidden')
  }
}

const postOrUpdateUserOrderGuard = (req, res, next) => {
  if (req.user && +req.user.id === +req.params.userId) {
    return next()
  } else {
    res.status(403).send('Forbidden')
  }
}

router.get('/', getUsersGuard, async (req, res, next) => {
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

router.get('/:userId', getOneUserGuard, async (req, res, next) => {
  try {
    const user = await User.findById(+req.params.userId, {
      attributes: ['id', 'email', 'firstName', 'lastName', 'isAdmin'],
      include: [Order]
    })
    if (user.orders.length) {
      res.json(user)
    } else {
      await Order.create({userId: user.id})
      const updatedUser = await User.findById(+req.params.userId, {
        attributes: ['id', 'email', 'firstName', 'lastName', 'isAdmin'],
        include: [Order]
      })
      res.json(updatedUser)
    }
  } catch (err) {
    next(err)
  }
})

router.delete('/:userId', deleteUserGuard, function(req, res, next) {
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

//removed the isAdmin for now, but when we have the admin page where one can update users, we will need to revisit

router.put('/:userId', updateUserGuard, async (req, res, next) => {
  try {
    const user = await User.findById(+req.params.userId)

    await user.update({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: req.body.password,
      // displayName: req.body.displayName,
      // email: req.body.email,
      isAdmin: req.body.isAdmin
    })
    res.json(user)
  } catch (err) {
    next(err)
  }
})

//orders

router.get('/:userId/orders', getUserOrdersGuard, async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      where: {userId: +req.params.userId},
      include: [{model: Celebrity}]
    })
    res.json(orders)
  } catch (err) {
    next(err)
  }
})

router.get('/:userId/orders/:orderId', getUserOrdersGuard, async (req, res, next) => {
  try {
    const orders = await Order.findById(req.params.orderId, {
      include: [{model: Celebrity}]
    })
    res.json(orders)
  } catch (err) {
    next(err)
  }
})

//to change an order to completed or cancelled

router.put('/:userId/orders/:orderId', updateUserOrderGuard, async (req, res, next) => {
  try {
    const orderId = req.params.orderId
    const userId = req.params.userId
    const orderObj = req.body
    const orderUpdates = orderObj.orderUpdates
    const orderToUpdate = await Order.findById(orderId)
    await orderToUpdate.update(orderUpdates)
    if (orderObj.type === 'Cancel') {
      const updatedOrder = await Order.findById(orderId, {
        include: [{model: Celebrity}]
      })
      res.json(updatedOrder)
    } else {
      const cart = await Order.create({userId: userId})
      const celebrities = orderObj.celebrities
      celebrities.forEach(async celebrity => {
        const celebrityOrderToUpdate = await CelebrityOrder.find({
          where: {orderId, celebrityId: celebrity.id}
        })
        const totalPurchasePrice = orderObj.promoCode
          ? celebrityOrderToUpdate.totalPurchasePrice *
            (orderObj.promoCode.discountPercentage / 100)
          : celebrityOrderToUpdate.totalPurchasePrice
        await celebrityOrderToUpdate.update({totalPurchasePrice})
      })
      if (orderObj.promoCode) {
        await PromoCodeUser.create({userId, promoCodeId: orderObj.promoCode.id, promoUsed: true})
      }
      const updatedOrder = await Order.findById(orderId, {
        include: [{model: Celebrity}]
      })
      res.json({updatedOrder, cart})
    }
  } catch (err) {
    next(err)
  }
})

//to add an item to a cart and send the revised cart back

router.post('/:userId/orders/:orderId/celebrities', postOrUpdateUserOrderGuard, async (req, res, next) => {
  try {
    const orderId = req.body.orderId
    const celebrityId = req.body.celebrityId
    const addQuantity = req.body.quantity
    const lineItem = await CelebrityOrder.find({
      where: {orderId, celebrityId}
    })
    if (lineItem) {
      const newQuantity = lineItem.quantity + addQuantity
      await lineItem.update({quantity: newQuantity})
    } else {
      await CelebrityOrder.create(req.body)
    }
    const updatedOrder = await Order.findById(orderId, {
      include: [{model: Celebrity}]
    })
    res.json(updatedOrder)
  } catch (error) {
    next(error)
  }
})

//update a quantity once an item is in the cart

router.put(
  '/:userId/orders/:orderId/celebrities/:celebrityId', postOrUpdateUserOrderGuard,
  async (req, res, next) => {
    try {
      const orderId = req.params.orderId
      const celebrityId = req.params.celebrityId
      const lineItem = await CelebrityOrder.find({
        where: {orderId, celebrityId}
      })
      await lineItem.update(req.body)
      const updatedOrder = await Order.findById(orderId, {
        include: [{model: Celebrity}]
      })
      res.json(updatedOrder)
    } catch (error) {
      next(error)
    }
  }
)

//to delete an item from a cart and send the revised cart back

router.delete(
  '/:userId/orders/:orderId/celebrities/:celebrityId', postOrUpdateUserOrderGuard,
  async (req, res, next) => {
    try {
      const orderId = +req.params.orderId
      const celebrityId = +req.params.celebrityId
      await CelebrityOrder.destroy({
        where: {celebrityId, orderId}
      })
      const updatedOrder = await Order.findById(orderId, {
        include: [{model: Celebrity}]
      })
      res.json(updatedOrder)
    } catch (error) {
      next(error)
    }
  }
)
