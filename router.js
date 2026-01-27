const express = require('express')
const router = express.Router()
const rateLimit = require('express-rate-limit')


const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 20,
    standardHeaders: 'draft-7',
    legacyHeaders: false,
    keyGenerator: (req) => { return req.session.user ? req.session.user._id : req.ip },
    handler: (req, res) => {
        res.status(429).json({
            message: "You have exceeded the maximum number of requests."
        })
    }
})


const idMap = {
  1: 'chocos',
  2: 'moons_stars',
  3: 'duet',
  4: 'chhota_laddoo',
  5: 'crunchy_bites',
}

const validTargets = Object.values(idMap)

router.get('/:target', (req, res) => {
  const { target } = req.params

  if (validTargets.includes(target)) {
    return res.render('index', { target })
  }

  return res.redirect('/moons_stars')
})

router.get('/', (req, res) => {
  
  return res.redirect('/moons_stars')
})
module.exports = router;