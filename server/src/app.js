const express = require('express')
const app = express()
const registerUserModel = require('./models/register.model')

app.use(express.json())


app.post('/api/user', async(req,res) => {
    const {firstName , lastName , dob , email , gender} = req.body

    const users = await registerUserModel.create({
        firstName,
        lastName,
        dob,
        email,
        gender
    })

    res.status(201).json({
        message : 'employee added successfully',
        users
    })
})

module.exports = app