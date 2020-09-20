const express = require('express')

const app = express()
app.use(express.json())

app.use('/', require('./routers/router'))

const PORT = 3003

app.listen(PORT)
