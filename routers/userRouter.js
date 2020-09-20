const router = require('express').Router()

router.post('/login', (req, res) => {
    res.send('Login endpoint')
})

router.post('/register', (req, res) => {
    res.send('Register endpoint')
})

router.get('/', (req, res) => {
    res.send('Get all users endpoint')
})

module.exports = router