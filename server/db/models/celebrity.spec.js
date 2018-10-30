/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const Celebrity = db.model('celebrity')

describe('Celebrity model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('Validations', () => {
    //prevent null first name
    it('requires first name', async () => {
      const celebrity = Celebrity.build({
        lastName: 'Test',
        occupation: 'Actor',
        gender: 'Female',
        description: 'This is a test description'
      })

      try {
        await celebrity.validate()
        throw Error(
          'validation was successful but should have failed with null firstName'
        )
      } catch (err) {
        expect(err.message).to.contain('firstName cannot be null')
      }
    })

    //prevent null last name
    it('requires last name', async () => {
        const celebrity = Celebrity.build({
            firstName: 'Test',
            occupation: 'Actor',
            gender: 'Female',
            description: 'This is a test description'
        })
  
        try {
          await celebrity.validate()
          throw Error(
            'validation was successful but should have failed with null lastName'
          )
        } catch (err) {
          expect(err.message).to.contain('lastName cannot be null')
        }
      })

      //prevents null occupation
      it('requires occupation', async () => {
        const celebrity = Celebrity.build({
            firstName: 'Test',
            lastName: 'Test',
            gender: 'Female',
            description: 'This is a test description'
        })
  
        try {
          await celebrity.validate()
          throw Error(
            'validation was successful but should have failed with null occupation'
          )
        } catch (err) {
          expect(err.message).to.contain('occupation cannot be null')
        }
      })

      //prevent null gender
      it('requires gender', async () => {
        const celebrity = Celebrity.build({
            firstName: 'Test',
            lastName: 'Test',
            occupation: 'Actor',
            description: 'This is a test description'
        })
  
        try {
          await celebrity.validate()
          throw Error(
            'validation was successful but should have failed with null gender'
          )
        } catch (err) {
          expect(err.message).to.contain('gender cannot be null')
        }
      })

      it('requires description', async () => {
        const celebrity = Celebrity.build({
            firstName: 'Test',
            lastName: 'Test',
            occupation: 'Actor',
            gender: 'Female',
        })
  
        try {
          await celebrity.validate()
          throw Error(
            'validation was successful but should have failed with null description'
          )
        } catch (err) {
          expect(err.message).to.contain('description cannot be null')
        }
      })

      it('uses a default image if imageUrl is null', () => {
          const celebrity = Celebrity.build({
            firstName: 'Test',
            lastName: 'Test',
            occupation: 'Actor',
            gender: 'Female',
            description: 'This is a test description'
          })

          expect(celebrity.imageUrl).to.equal('https://drive.google.com/thumbnail?id=19Q4vIKQuZBMP9y8yQBFl4BOZAW0pYMq4')
      })

    })
})
