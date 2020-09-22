const level = require('level')
const shortid = require('shortid')

const database = {
    'users': level('./database/db/UsersDB', { valueEncoding: 'json' }),
    'cocktails': level('./database/db/CocktailDB', { valueEncoding: 'json' })
}

const getUser = async (username) => {
    try {
        return await database.users.get(username)
    } catch (error) {
        if (error.notFound) {
            return null
        }
    }
}

const putUser = async (userInfo) => {
    const { username, salt, hash } = userInfo
    if (!username || !salt || !hash) {
        console.log('Can not store user with missing information')
        return false
    }

    await database.users.put(username, { username, salt, hash })
    return true
}

const getAllUsers = () => {
    return new Promise((resolve, reject) => {
        const values = []
        database.users.createKeyStream()
            .on('data', (data) => {
                values.push(data)
            })
            .on('close', () => resolve(values))
            .on('error', (error) => {
                console.log('error', error)
                reject(error)
            })
    })
}

const getCocktail = async (username, key) => {
    if (!key) {
        return getCocktails(username)
    } else {
        const cocktail =  await database.cocktails.get(key)
        if (cocktail.owner === username) {
            return cocktail
        } else {
            return null
        }
    }
}

const getCocktails = (username) => {
    return new Promise((resolve, reject) => {
        const values = []
        database.cocktails.createReadStream()
            .on('data', (data) => {
                if (data.value.owner == username) {
                    values.push({ ...data.value, id: data.key })
                }
            })
            .on('close', () => resolve(values))
            .on('error', (error) => {
                console.log('error', error)
                reject(error)
            })
    })
}

const putCocktail = async (cocktail) => {
    const objectToSave = {
        name: cocktail.name,
        ingredients: cocktail.ingredients,
        garnish: cocktail.garnish,
        method: cocktail.method,
        glass: cocktail.glass,
        info: cocktail.info,
        owner: cocktail.owner
    }

    const key = cocktail.id ? cocktail.id : shortid.generate()
    database.cocktails.put(key, objectToSave)
}

const delCocktail = (key) => {
    database.cocktails.del(key)
}

const allCocktails = () => {
    return new Promise((resolve, reject) => {
        const values = []
        database.cocktails.createReadStream()
            .on('data', (data) => {
                values.push(data)
            })
            .on('close', () => resolve(values))
            .on('error', (error) => {
                console.log('error', error)
                reject(error)
            })
    })
}

module.exports = {
    'users': {
        get: getUser,
        put: putUser,
        all: getAllUsers
    },
    'cocktails': {
        get: getCocktail,
        put: putCocktail,
        del: delCocktail,
        all: allCocktails
    }
}