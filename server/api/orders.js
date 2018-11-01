// const router = require('express').Router()
// const {Order, Celebrity} = require('../db/models')
// module.exports = router

// router.get('/:userId/orders', async (req, res, next) => {
//     try {
//       console.log(req.params)
//       const orders = await Order.findAll({
//         where: {userId: req.params.userId},
//         include: [{model: Celebrity}]
//       })
//       res.json(orders)
//     } catch (err) {
//       next(err)
//     }
//   })
  
//   router.get('/:userId/orders/:orderId', async (req, res, next) => {
//     try {
//       console.log(req.params)
//       const orders = await Order.findById(req.params.orderId, {
//         include: [{model: Celebrity}]
//       })
//       res.json(orders)
//     } catch (err) {
//       next(err)
//     }
//   })
