const resetPassword = async () => {

    const username = process.argv[2]
    const password = process.argv[3]

    if (!username || !password) {
        return console.error('two arguments required: an existing username and a new password')
    }

    const { users } = require('../database/level')
    if (!users) {
        return console.error('error opening the users database')
    }

    const user = await users.get(username)
    if (!user) {
        return console.error('username ' + username + ' not found')
    }
    const { generateSaltAndHash } = require('../auth/authUtils')
    const { salt, hash } = generateSaltAndHash(password)

    const allUsers = await users.all()
    console.log('allUsers', allUsers)

    await users.put(username, Object.assign(user, { salt, hash }))
    console.log('password has been updated')
}

resetPassword()




