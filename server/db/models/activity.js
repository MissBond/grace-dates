const Sequelize = require('sequelize')
const db = require('../db')

const Activity = db.define('activity', {
  activityName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT
  },
  price: {
    type: Sequelize.DECIMAL,
    defaultValue: 1.00,
    allowNull: false
  }
})

module.exports = Activity
