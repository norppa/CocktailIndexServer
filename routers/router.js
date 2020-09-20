const router = require('express').Router()

router.use('/users', require('./userRouter'))

router.get('/', (req, res) => {
    res.send('Cocktail Index Server')
})

module.exports = router