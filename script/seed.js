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
    }),
    User.create({
      email: 'sullivan@email.com',
      password: '123',
      firstName: 'Sullivan',
      lastName: "O'Neil",
      isAdmin: false
    }),
    User.create({
      email: 'charlie@email.com',
      password: '444',
      firstName: 'Charlie',
      lastName: 'Valentine',
      isAdmin: false
    }),
    User.create({
      email: 'ottis@email.com',
      password: '555',
      firstName: 'Ottis',
      lastName: 'Moore',
      isAdmin: true
    })
  ])

  const celebrities = await Promise.all([
    Celebrity.create({
      firstName: 'Drake',
      lastName: 'Drizzy',
      imageUrl:
        'https://shawetcanada.files.wordpress.com/2017/07/drake.png?w=720&h=480&crop=1',
      occupation: 'Rapper',
      gender: 'Male',
      netWorthMillions: 142,
      description: 'Litty rapper. Cool af.'
    }),
    Celebrity.create({
      firstName: 'John',
      lastName: 'Stamos',
      imageUrl:
        'https://starsinformer.com/wp-content/uploads/2017/10/576f9e7747b2d90ab2cf83574b8f93aa.jpg',
      occupation: 'Actor',
      gender: 'Male',
      netWorthMillions: 40,
      description: 'John is the best. Good date to go on!'
    }),
    Celebrity.create({
      firstName: 'Abraham',
      lastName: 'Lincoln',
      imageUrl:
        'https://ih1.redbubble.net/image.526433040.6636/flat,550x550,075,f.u3.jpg',
      occupation: 'historical figure',
      gender: 'Male',
      netWorthMillions: 700,
      description:
        'I have stepped out upon this platform that I may see you and that you may see me, and in the arrangement I have the best of the bargain'
    }),
    Celebrity.create({
      firstName: 'Maryl',
      lastName: 'Streep',
      imageUrl:
        'https://www.biography.com/.image/t_share/MTE1ODA0OTcxNzk1NjQ1OTY1/meryl-streep-9497266-1-402.jpg',
      occupation: 'Actress',
      gender: 'Female',
      netWorthMillions: 90,
      description: 'Mamma Mia, here I go again!'
    }),
    Celebrity.create({
      firstName: 'Taylor',
      lastName: 'Swift',
      imageUrl:
        'https://www.billboard.com/files/media/taylor-swift-grammys-2015-a-billboard-1548.jpg',
      occupation: 'Singer',
      gender: 'Female',
      netWorthMillions: 550,
      description:
        "People haven't always been there for me but music always has."
    }),
    Celebrity.create({
      firstName: 'Madonna',
      lastName: 'Louise Ciccone',
      imageUrl:
        'https://www.edmsauce.com/wp-content/uploads/2014/05/Madonna.jpg',
      occupation: 'Singer',
      gender: 'Female',
      netWorthMillions: 800,
      description:
        "I'm tough, I'm ambitious, and I know exactly what I want.If that makes me a bitch, okay."
    }),
    Celebrity.create({
      firstName: 'Oprah',
      lastName: 'Winfrey',
      imageUrl:
        'https://defendernetwork.com/wp-content/uploads/2017/10/1_Oprah.jpg',
      occupation:
        'Media executive, actress, talk show host, television producer and philanthropis',
      gender: 'Female',
      netWorthMillions: 2700,
      description:
        "Be thankful for what you have; you'll end up having more. If you concentrate on what you don't have, you will never, ever have enough."
    }),
    Celebrity.create({
      firstName: 'Cardi',
      lastName: 'B',
      imageUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQu2EsIe2XAABKvfVkJG_gfynaIPa63Gzw3ufmAzaDKEoOpbDpNNg',
      occupation: 'Artist',
      gender: 'Female',
      netWorthMillions: 4,
      description:
        'I don’t care about anyone not liking me, you b*****s barely like yourselves.'
    }),
    Celebrity.create({
      firstName: 'Diana',
      lastName: 'Princess of Wales',
      imageUrl:
        'https://www.aquarelle.md/uploads/news/69706/60683_import_image.png',
      occupation: ' Member of the British royal family',
      gender: 'Female',
      netWorthMillions: 31,
      description:
        'They say it is better to be poor and happy than rich and miserable, but how about a compromise like moderately rich and just moody?'
    }),
    Celebrity.create({
      firstName: 'Amelia',
      lastName: 'Earhart',
      imageUrl:
        'https://c1.staticflickr.com/8/7029/13383112033_f61641b462_b.jpg',
      occupation: 'Aviation pioneer',
      gender: 'Female',
      netWorthMillions: 1,
      description:
        "You haven't seen a tree until you've seen its shadow from the sky."
    }),
    Celebrity.create({
      firstName: 'Indira',
      lastName: 'Gandhi',
      imageUrl:
        'https://www.hindustantimes.com/rf/image_size_960x540/HT/p2/2017/07/08/Pictures/_7baa2fe4-639c-11e7-8e9a-26934b659213.jpg',
      occupation: 'Prime minister of India ',
      gender: 'Female',
      netWorthMillions: 2000,
      description: 'The power to question is the basis of all human progress.'
    }),
    Celebrity.create({
      firstName: 'Albert',
      lastName: 'Einstein',
      imageUrl:
        'https://i.pinimg.com/originals/6d/a4/47/6da447ba6c60b30febe686d145ef6b9b.jpg',
      occupation: 'Theoretical Physicist ',
      gender: 'Male',
      netWorthMillions: 1,
      description:
        "Two things are infinite: the universe and human stupidity; and I'm not sure about the universe"
    }),
    Celebrity.create({
      firstName: 'Gianluca ',
      lastName: 'Vacchi',
      imageUrl:
        'https://chi-e.com/wp-content/uploads/2018/05/gianluca-vacchi.jpg',
      occupation: 'Entrepreneur',
      gender: 'Male',
      netWorthMillions: 450,
      description:
        'What I would love them to think is that there is always time to change, there is always time to hope, there is always time to dream. What I achieved in life, I did because I dreamed. They renounce life too easily, they need to keep going because the opportunities are there.'
    }),
    Celebrity.create({
      firstName: 'Barak',
      lastName: 'Obama',
      imageUrl:
        'https://imagesvc.timeincapp.com/v3/mm/image?url=https%3A%2F%2Fpeopledotcom.files.wordpress.com%2F2017%2F11%2Fbarack-obama1.jpg%3Fw%3D2000&w=700&c=sc&poi=face&q=85',
      occupation: 'Politician, former US President',
      gender: 'Male',
      netWorthMillions: 40,
      description:
        'The future rewards those who press on. I don’t have time to feel sorry for myself. I don’t have time to complain. I’m going to press on.'
    }),
    Celebrity.create({
      firstName: 'Adam',
      lastName: 'Levine',
      imageUrl:
        'https://i.pinimg.com/originals/d6/f7/f3/d6f7f3b0176061509a0ef71c133b4b9c.jpg',
      occupation: 'Musician',
      gender: 'Male',
      netWorthMillions: 90,
      description: 'Before I go on stage I pretend that everyone loves me.'
    }),
    Celebrity.create({
      firstName: 'Jason',
      lastName: 'Momoa',
      imageUrl:
        'https://amp.businessinsider.com/images/59e0c83bb0c2923a0d5507ec-750-562.jpg',
      occupation: 'Actor',
      gender: 'Male',
      netWorthMillions: 14,
      description:
        "I'm kind of ADD in that sense where if I start liking something, I'll just learn it to the absolute max."
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
