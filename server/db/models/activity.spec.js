/* global describe beforeEach it */

//no longer used
const {expect} = require('chai')
const db = require('../index')
const Activity = db.model('activity')

describe('Activity model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('Validations', () => {
    //prevent null first name
    it.skip('requires activity name', async () => {
      const activity = Activity.build({
        price: 4.00
      })

      try {
        await activity.validate()
        throw Error(
          'validation was successful but should have failed with null activityName'
        )
      } catch (err) {
        expect(err.message).to.contain('activityName cannot be null')
      }
    })

    it.skip('uses a default price if price is null', () => {
        const activity = Activity.build({
          activityName: 'hiking'
        })
  
        expect(activity.price).to.equal(1.00)
      })
    })
})