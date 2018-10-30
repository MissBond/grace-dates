/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const Review = db.model('review')

describe('Review model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('Validations', () => {
    //prevent null first name
    it('requires header', async () => {
      const review = Review.build({
        rating: 1.0,
        date: 2018 - 10 - 31,
        description: 'this was really fun'
      })

      try {
        await review.validate()
        throw Error(
          'validation was successful but should have failed with null header'
        )
      } catch (err) {
        expect(err.message).to.contain('header cannot be null')
      }
    })

    it('requires rating', async () => {
      const review = Review.build({
        header: 'Hiking with Heidi Klum',
        date: 2018 - 10 - 31,
        description: 'this was really fun'
      })

      try {
        await review.validate()
        throw Error(
          'validation was successful but should have failed with null rating'
        )
      } catch (err) {
        expect(err.message).to.contain('rating cannot be null')
      }
    })

    it('requires date', async () => {
      const review = Review.build({
        header: 'Hiking with Heidi Klum',
        rating: 3.0,
        description: 'this was really fun'
      })

      try {
        await review.validate()
        throw Error(
          'validation was successful but should have failed with null date'
        )
      } catch (err) {
        expect(err.message).to.contain('date cannot be null')
      }
    })

    it('requires description', async () => {
      const review = Review.build({
        header: 'Hiking with Heidi Klum',
        rating: 3.0,
        date: 2018 - 10 - 31
      })

      try {
        await review.validate()
        throw Error(
          'validation was successful but should have failed with null description'
        )
      } catch (err) {
        expect(err.message).to.contain('description cannot be null')
      }
    })

    it('constrains rating to number between 0.0 and 5.0', async () => {
      const review = await Review.build({
        header: 'Hiking with Heidi Klum',
        rating: -0.5,
        date: 2018 - 10 - 31,
        description: 'this really stunk'
      })

      try {
        await review.validate()
        throw Error(
          'validation was successful but should have failed with an invalid rating'
        )
      } catch (err) {
        expect(err.message).to.contain(
          'Validation error: Validation min on rating failed'
        )
      }

      const review2 = await Review.build({
        header: 'Hiking with Heidi Klum',
        rating: 5.5,
        date: 2018 - 10 - 31,
        description: 'this really stunk'
      })

      try {
        await review2.validate()
        throw Error(
          'validation was successful but should have failed with an invalid rating'
        )
      } catch (err) {
        expect(err.message).to.contain(
          'Validation error: Validation max on rating failed'
        )
      }
    })
  })
})
