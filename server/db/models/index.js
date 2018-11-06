const User = require('./user')
const Celebrity = require('./celebrity')
const Activity = require('./activity')
const Review = require('./review')
const Order = require('./order')
const CelebrityOrder = require('./celebrity-order')
const PromoCode = require('./promoCode')
const PromoCodeUser = require('./promoCode-user')

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

Celebrity.belongsToMany(Order, {through: CelebrityOrder, foreignKey: 'celebrityId'})
Order.belongsToMany(Celebrity, {through: CelebrityOrder, foreignKey: 'orderId'})

User.hasMany(Order)
Order.belongsTo(User)

PromoCode.belongsToMany(User, {through: PromoCodeUser, foreignKey: 'promoCodeId'})
User.belongsToMany(PromoCode, {through: PromoCodeUser, foreignKey: 'userId'})

PromoCode.hasMany(Order)
Order.belongsTo(PromoCode)

module.exports = {
  User,
  Celebrity,
  Activity,
  Review,
  Order,
  CelebrityOrder,
  PromoCode,
  PromoCodeUser
}
