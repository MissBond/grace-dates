// /* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const User = db.model('user')

describe('User routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/celebrities/:celebrityId/reviews', () => {
    const codysEmail = 'cody@puppybook.com'

    beforeEach(() => {
      return User.create({
        firstName: 'Cody',
        lastName: 'Test',
        email: codysEmail
      })
    })

    it('should be able to GET /api/celebrities/:celebrityId/reviews', async () => {
      const res = await request(app)
        .get('/api/celebrities/1/reviews')
        .expect(200)

      expect(res.status).to.be.equal(200)
    })

    it('should not be able to POST a new Review without header', () => {
      let review = {
        rating: 3.0,
        description: 'Test description'
      }

      it('respond with 500 server error', function(done) {
        request(app)
          .post('/api/celebrities/1/reviews')
          .send(review)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(500)
          .end(err => {
            if (err) return done(err)
            done()
          })
      })
    })

    it('should not be able to POST a new Review without description', () => {
      let review = {
        header: 'Test header',
        rating: 3.0
      }

      it('respond with 500 server error', function(done) {
        request(app)
          .post('/api/celebrities/1/reviews')
          .send(review)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(500)
          .end(err => {
            if (err) return done(err)
            done()
          })
      })
    })
  })
}) 
