const Sequelize = require('sequelize')
const db = require('../db')

const Review = db.define('review', {
  header: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  rating: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0.0,
      max: 5.0
    }
  },
  date: {
    type: Sequelize.DATEONLY,
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false
  }
})

module.exports = Review
