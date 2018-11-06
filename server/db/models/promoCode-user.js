const Sequelize = require('sequelize')
const db = require('../db')

const PromoCodeUser = db.define('promoCodeUser', {
  promoUsed: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
})

module.exports = PromoCodeUser