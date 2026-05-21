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
app.patch('/api/user/:id', async(req, res) => {
    try {
        const id = req.params.id
        const user = await registerUserModel.findById(id)
        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            })
        }
        if (req.body.role) {
            user.role = req.body.role
        }
        await user.save()
        res.status(200).json({
            message: 'Role updated successfully',
            user
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
})


module.exports = app