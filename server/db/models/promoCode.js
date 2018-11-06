const Sequelize = require('sequelize')
const db = require('../db')

const PromoCode = db.define('promoCode', {
  code: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  discountPercentage: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
      max: 100,
      min: 0
    }
  }
})

module.exports = PromoCode
