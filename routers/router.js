const router = require('express').Router()
const { test } = require('../database/level')

router.use('/users', require('./userRouter'))

router.get('/', (req, res) => {
    res.send('Cocktail Index Server')
})

router.get('/dbgettest', async (req, res) => {
    const value = await test.get()
    res.send('Database value is ' + value)
})
router.get('/dbsettest', async (req, res) => {
    await test.set()
    res.send('Database has been set')
})

module.exports = router