'use strict'

const db = require('../server/db')
const {User, Celebrity, Review} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({
      email: 'cody@email.com',
      password: '123',
      firstName: 'Cody',
      lastName: 'Test',
      isAdmin: true
    }),
    User.create({
      email: 'murphy@email.com',
      password: '123',
      firstName: 'Murphy',
      lastName: 'Test',
      isAdmin: false
    })
  ])

  const celebrities = await Promise.all([
    Celebrity.create({
      firstName: 'Drake',
      lastName: 'Drizzy',
      imgUrl:
        'https://ih1.redbubble.net/image.493223166.4227/st%2Csmall%2C215x235-pad%2C210x230%2Cf8f8f8.lite-1u1.jpg',
      occupation: 'Rapper',
      gender: 'Male',
      netWorthMillions: 500,
      description: 'Litty rapper. Cool af.'
    }),
    Celebrity.create({
      firstName: 'John',
      lastName: 'Stamos',
      imgUrl:
        'https://ih1.redbubble.net/image.493223166.4227/st%2Csmall%2C215x235-pad%2C210x230%2Cf8f8f8.lite-1u1.jpg',
      occupation: 'Actor',
      gender: 'Male',
      netWorthMillions: 800,
      description: 'John is the best. Good date to go on!'
    }),
    Celebrity.create({
      firstName: 'Abraham',
      lastName: 'Lincoln',
      imageUrl: 'https://civilwartalk.com/attachments/image-jpeg.107281/',
      occupation: 'historical figure',
      gender: 'Male',
      netWorthMillions: 700,
      description:
        'I have stepped out upon this platform that I may see you and that you may see me, and in the arrangement I have the best of the bargain'
    }),
    Celebrity.create({
      firstName: 'Maryl',
      lastName: 'Streep',
      imgUrl:
        'https://ih1.redbubble.net/image.493223166.4227/st%2Csmall%2C215x235-pad%2C210x230%2Cf8f8f8.lite-1u1.jpg',
      occupation: 'Actress',
      gender: 'Female',
      netWorthMillions: 600,
      description: 'Litty rapper. Cool af.'
    })
  ])

  const reviews = await Promise.all([
    Review.create({
      header: 'Great Date!',
      rating: 4.7,
      date: 2018 - 10 - 31,
      description: 'Had a great time!'
    })
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
