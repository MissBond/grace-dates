const Sequelize = require('sequelize')
const db = require('../db')

const Celebrity = db.define('celebrity', {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue:
      'https://drive.google.com/thumbnail?id=19Q4vIKQuZBMP9y8yQBFl4BOZAW0pYMq4'
  },
  occupation: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  gender: {
    type: Sequelize.ENUM('Female', 'Male', 'Other'),
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  netWorthMillions: {
    type: Sequelize.INTEGER
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  isAvailable: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  }
})

module.exports = Celebrity
