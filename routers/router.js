const router = require('express').Router()
const passport = require('passport')

const { authenticate, isAdmin } = require('../auth/authUtils')

require('../auth/passport')(passport)
router.use(passport.initialize())

router.use('/users', require('./userRouter'))
router.use('/cocktails', require('./cocktailRouter'))

router.get('/methods', authenticate, async (req, res) => {
    res.json(['Shaken', 'Stirred', 'Flash Blended', 'Built'])
})
router.get('/glasses', authenticate, async (req, res) => {
    res.json(['Double Old Fashioned', 'Hurricane', 'Coupe'])
})
router.get('/', (req, res) => {
    res.send('Cocktail Index Server')
})

module.exports = router