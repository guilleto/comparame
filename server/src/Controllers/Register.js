'use strict'

const mongoose = require('mongoose')
const User = require('../Models/User')

function Register (req,res){
    const user = new User({
        rols: req.body.Rol,
        username: req.body.Username,
        email: req.body.Email,
        name: req.body.Name,
        lastname: req.body.Lastname        
    })

    user.save((err) => {
        if (err) return res.status(500).send({
             message: `Error al crear el usuario: ${err}` 
            })
    
        return res.status(201).send({ token: service.createToken(user) })
      })
}