const level = require('level')

const database = {
    'test': level('./database/db/TestDB', { valueEncoding: 'json' })
}

const KEY = '@TEST'

const setTest = async () => {
    try {
        const value = await database.test.get(KEY)
        const newValue = value + 1
        await database.test.put(KEY, newValue)
    } catch (error) {
        if (error.notFound) {
            await database.test.put(KEY, 1)
        }
    }
    
}

const getTest = async () => {
    try {
        return await database.test.get(KEY)
    } catch (error) {
        if (error.notFound) {
            return "Key not found"
        }
    }
}


module.exports = {
    'test': {
        get: getTest,
        set: setTest,
    }
}