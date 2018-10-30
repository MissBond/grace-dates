/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const User = db.model('user')

describe('User model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('instanceMethods', () => {
    describe('correctPassword', () => {
      let cody

      beforeEach(async () => {
        cody = await User.create({
          firstName: 'Cody',
          lastName: 'Test',
          email: 'cody@puppybook.com',
          password: 'bones'
        })
      })

      it('returns true if the password is correct', () => {
        expect(cody.correctPassword('bones')).to.be.equal(true)
      })

      it('returns false if the password is incorrect', () => {
        expect(cody.correctPassword('bonez')).to.be.equal(false)
      })
    }) // end describe('correctPassword')
  })

  describe('Validations', () => {
    //prevent null first name
    it('requires first name', async () => {
      const user = User.build({
        lastName: 'Test',
        email: 'test@test.com'
      })

      try {
        await user.validate()
        throw Error(
          'validation was successful but should have failed with null firstName'
        )
      } catch (err) {
        expect(err.message).to.contain('firstName cannot be null')
      }
    })

    //prevent null last name
    it('requires last name', async () => {
      const user = User.build({
        firstName: 'Test',
        email: 'test@test.com'
      })

      try {
        await user.validate()
        throw Error(
          'validation was successful but should have failed with null lastName'
        )
      } catch (err) {
        expect(err.message).to.contain('lastName cannot be null')
      }
    })

    //prevent null email
    it('requires email', async () => {
      const user = User.build({
        firstName: 'Test',
        lastName: 'Test'
      })

      try {
        await user.validate()
        throw Error(
          'validation was successful but should have failed with null email'
        )
      } catch (err) {
        expect(err.message).to.contain('email cannot be null')
      }
    })

    //prevent invalid email
    it('requires valid email', async () => {
      const user = User.build({
        firstName: 'Test',
        lastName: 'Test',
        email: 'test.com'
      })

      try {
        await user.validate()
        throw Error(
          'validation was successful but should have failed with invalid email'
        )
      } catch (err) {
        expect(err.message).to.contain('Validation isEmail on email failed')
      }
    })
  })

  //describe hook
  describe('Hooks', () => {
    it('correctly concatenates first and last name to form displayName', async () => {
      const user = await User.create({
        firstName: 'Test',
        lastName: 'Test',
        email: 'test@test.com'
      })

      expect(user.displayName).to.equal('Test Test')
    })
  })
}) // end describe('User model')
