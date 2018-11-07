const router = require('express').Router()
const {PromoCode} = require('../db/models')
module.exports = router

//not in use!
router.get('/', async (req, res, next) => {
  try {
    const promoCodes = await PromoCode.findAll()
    res.json(promoCodes)
  } catch (err) {
    next(err)
  }
})

router.get('/:promocodeId', async (req, res, next) => {
  try {
    const promoCodeId = req.params.promocodeId
    const promoCode = await PromoCode.findById(promoCodeId)
    res.json(promoCode)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const newPromoCode = await PromoCode.create(req.body)
    res.json(newPromoCode)
  } catch (err) {
    next(err)
  }
})

router.put('/:promocodeId', async (req, res, next) => {
  try {
    const promoCodeId = req.params.promocodeId
    const updates = req.body
    const promoCodeToUpdate = await PromoCode.findById(promoCodeId)
    if (promoCodeToUpdate === null) {
      res.status(404).send()
    } else {
      const updatedPromoCode = await promoCodeToUpdate.update(updates)
      res.json(updatedPromoCode)
    }
  } catch (err) {
    next(err)
  }
})

router.delete('/:promocodeId', async (req, res, next) => {
  try {
    await PromoCode.destroy({
      where: {id: req.params.promocodeId}
    })
    res.status(204).end()
  } catch (err) {
    next(err)
  }
})
