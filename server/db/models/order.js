const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  status: {
    type: Sequelize.ENUM('Pending', 'Completed', 'Canceled'),
    defaultValue: 'Pending'
  }
})

module.exports = Order
