const router = require('express').Router()
const passport = require('passport')

const {authenticate, isAdmin} = require('../auth/authUtils')

require('../auth/passport')(passport)
router.use(passport.initialize())

router.use('/users', require('./userRouter'))

router.get('/', (req, res) => {
    res.send('Cocktail Index Server')
})

router.get('/auth', authenticate, async (req, res) => {
    res.send('Authenticated endpoint')
})
router.get('/admin', authenticate, isAdmin, async (req, res) => {
    res.send('Admin endpoint')
})

module.exports = router