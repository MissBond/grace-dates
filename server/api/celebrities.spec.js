// /* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const User = db.model('user')

describe('Celebrities routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/celebrities/', () => {
    const codysEmail = 'cody@puppybook.com'

    beforeEach(() => {
      return User.create({
        firstName: 'Cody',
        lastName: 'Test',
        email: codysEmail
      })
    })

    it('should be able to GET /api/celebrities', async () => {
      const res = await request(app)
        .get('/api/celebrities/')
        .expect(200)

      expect(res.status).to.be.equal(200)
    })

    it('should not be able to POST a new Celebrity without being an Admin', () => {
      let newCeleb = {
        firstName: 'Test',
        lastName: 'Test',
        imageUrl:
          'https://drive.google.com/thumbnail?id=19Q4vIKQuZBMP9y8yQBFl4BOZAW0pYMq4',
        occupation: 'Test',
        gender: 'Other',
        netWorthMillions: 500,
        description: 'Test description',
        isAvailable: true
      }

      it('respond with 403 error', function(done) {
        request(app)
          .post('/api/celebrities/')
          .send(newCeleb)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(403)
          .end(err => {
            if (err) return done(err)
            done()
          })
      })
    })
  })

  describe('/api/celebrities/:celebrityId', () => {
    const codysEmail = 'cody@puppybook.com'

    beforeEach(() => {
      return User.create({
        firstName: 'Cody',
        lastName: 'Test',
        email: codysEmail
      })
    })

    it('should be able to GET one celebrity at /api/celebrities/:celebrityId', async () => {
      const res = await request(app)
        .get('/api/celebrities/1')
        .expect(200)

      expect(res.status).to.be.equal(200)
    })

    it('should not be able to PUT one celebrity at /api/celebrities/:celebrityId without being an Admin', async () => {
      let updatedCeleb = {
        firstName: 'Test',
        lastName: 'Test',
        imageUrl:
          'https://drive.google.com/thumbnail?id=19Q4vIKQuZBMP9y8yQBFl4BOZAW0pYMq4',
        occupation: 'Test',
        gender: 'Other',
        netWorthMillions: 500,
        description: 'Test description',
        isAvailable: false
      }

      it('respond with 403 error', function(done) {
        request(app)
          .put('/api/celebrities/1')
          .send(updatedCeleb)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(403)
          .end(err => {
            if (err) return done(err)
            done()
          })
      })
    })
  })

  describe('/api/celebrities/1/reviews', () => {
    const codysEmail = 'cody@puppybook.com'

    beforeEach(() => {
      return User.create({
        firstName: 'Cody',
        lastName: 'Test',
        email: codysEmail
      })
    })

    it('should be able to GET /api/celebrities/1/reviews', async () => {
      const res = await request(app)
        .get('/api/celebrities/1/reviews')
        .expect(200)

      expect(res.status).to.be.equal(200)
    })

    it('should not be able to POST a new Celebrity Review without being logged in', () => {
      let newReview = {
        header: 'Test',
        rating: 3.0,
        description: 'Test description'
      }

      it('respond with 403 error', function(done) {
        request(app)
          .post('/api/celebrities/1/reviews')
          .send(newReview)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(403)
          .end(err => {
            if (err) return done(err)
            done()
          })
      })
    })
  })
})
