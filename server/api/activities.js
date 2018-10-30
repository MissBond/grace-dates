const router = require('express').Router()
const {Celebrity, Activity} = require('../db/models')
module.exports = router


router.get('/', async (req, res, next) => {
  try {
    const allActivities = await Activity.findAll({
      include: [{model: Celebrity}]
    });
    res.json(allActivities);
  } catch (err) {
    next(err);
  }
});

router.get('/:activityId', function(req, res, next) {
  Activity.findById(+req.params.activityId, {
      include: [{ model: Celebrity}]
    }).then(activity => {
      if (!activity) return res.sendStatus(404);
      res.json(activity);
    })
      .catch(next);
});

router.post('/', async (req, res, next) => {
  try {
    const newActivity = await Activity.create({
      activityName: req.body.activityName,
      description: req.body.description,
      price: req.body.price
    });
    res.json(newActivity);
  } catch (err) {
    next(err);
  }
});

router.delete('/:activityId', function(req, res, next) {
  Activity.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(() => {
    res.sendStatus(204);
  })
  .catch(next);
});

router.put('/:activityId', async (req, res, next) => {
  try {
    const updatedActivity = await Activity.findById(+req.params.activityId);
    await updatedActivity.update({
      activityName: req.body.activityName,
      description: req.body.description,
      price: req.body.price
    });
    res.json(updatedActivity)
  } catch (err) {
    next(err);
  }
});
