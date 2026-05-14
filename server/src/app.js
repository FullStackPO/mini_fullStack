const express = require('express')
const app = express()
const registerUserModel = require('./models/register.model')

app.use(express.json())

module.exports = app