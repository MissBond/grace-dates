const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  status: {
    type: Sequelize.ENUM('Pending', 'Completed', 'Canceled'),
    defaultValue: 'Pending'
  },
  orderCost: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
})

module.exports = Order
