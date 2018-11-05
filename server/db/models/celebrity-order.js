const Sequelize = require('sequelize')
const db = require('../db')

const CelebrityOrder = db.define('celebrityOrder', {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  totalPurchasePrice: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
})

module.exports = CelebrityOrder