const express = require('express')
const app = express()
const registerUserModel = require('./models/register.model')
const cors = require('cors')

//middlewares
app.use(cors())
app.use(express.json())

//post API
app.post('/api/user', async(req,res) => {
    const {firstName , lastName , dob , email , gender, role} = req.body

    const users = await registerUserModel.create({
        firstName,
        lastName,
        dob,
        email,
        gender,
        role
    })

    res.status(201).json({
        message : 'employee added successfully',
        users
    })
})

//get API
app.get('/api/user', async(req,res) => {

    const users = await registerUserModel.find()

    res.status(200).json({
        users
    })
})

//delete API
app.delete('/api/user/:id', async(req,res) => {

    const id = req.params.id

    const users = await registerUserModel.findByIdAndDelete(id)

    res.status(200).json({
        message : 'Deleted Successfully',
        users
    })
})

//patch API


module.exports = app