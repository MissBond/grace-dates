const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:userId', async (req, res, next) => {
    try {
      const users = await User.findById(+req.params.userId, {
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
});

router.post('/', async (req, res, next) => {
  try {
    const newUser = await User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      displayName: req.body.displayName,
      email: req.body.email,
      isAdmin: req.body.isAdmin
    });
    res.json(newUser);
  } catch (err) {
    next(err);
  }
});


router.delete('/:userId', function(req, res, next) {
  User.destroy({
    where: {
      id: req.params.userId
    }
  })
  .then(() => {
    res.sendStatus(204);
  })
  .catch(next);
});

router.put('/:userId', async (req, res, next) => {
  try {
    const updatedUser = await User.findById(+req.params.userId);
    await updatedUser.update({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      displayName: req.body.displayName,
      email: req.body.email,
      isAdmin: req.body.isAdmin
    });
    res.json(updatedUser)
  } catch (err) {
    next(err);
  }
});
