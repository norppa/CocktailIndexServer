const router = require('express').Router()

router.get('/', (req, res) => {
    res.send('Cocktail Index Server')
})

module.exports = router