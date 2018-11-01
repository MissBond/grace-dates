const User = require('./user')
const Celebrity = require('./celebrity')
const Activity = require('./activity')
const Review = require('./review')
const Order = require('./order')
const CelebrityOrder = require('./celebrity-order')

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */

User.hasMany(Review)
Review.belongsTo(User)

Celebrity.hasMany(Review)
Review.belongsTo(Celebrity)

Celebrity.hasMany(Activity)
Activity.belongsTo(Celebrity)

Celebrity.belongsToMany(Order, {through: CelebrityOrder, foreignKey: "celebrityId"})
Order.belongsToMany(Celebrity, {through: CelebrityOrder, foreignKey: "orderId"})

User.hasMany(Order)
Order.belongsTo(User)

module.exports = {
  User,
  Celebrity,
  Activity,
  Review,
  Order,
  CelebrityOrder
}
