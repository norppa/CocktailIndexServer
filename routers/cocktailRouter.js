const router = require('express').Router()

const { cocktails } = require('../database/level')
const { authenticate, isAdmin } = require('../auth/authUtils')

// Get all cocktails belonging to user
router.get('/', authenticate, async (req, res) => {
    const userCocktails = await cocktails.get(req.user.username)
    res.status(200).json(userCocktails)
})

// Add new cocktail or modify existing cocktail
router.post('/', authenticate, async (req, res) => {
    const cocktail = req.body
    cocktail.owner = req.user.username
    await cocktails.put(cocktail)
    res.status(200).send()
})

// Delete cocktail
router.delete('/', authenticate, async (req, res) => {
    const key = req.body.key
    const user = req.user.username
    const cocktail = await cocktails.get(user, key)
    if (cocktail) {
        cocktails.del(req.body.key)
    }
    res.status(200).send()
})


// Admin endpoints

router.get('/all', authenticate, isAdmin, async (req, res) => {
    const allCocktails = await cocktails.all(req.user.username)
    res.status(200).json(allCocktails)
})

module.exports = router