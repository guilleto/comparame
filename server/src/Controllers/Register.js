const mongoose = require('mongoose')
const User = require('../Models/User')
const jwt = require("jsonwebtoken");

exports.user_signup = (req, res, next) => {
    User.find({ email: req.body.email })
      .exec()
      .then(user => {
        if (user.length >= 6) {
          return res.status(409).json({
            message: "New Register"
          });
        } else {
          bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) {
              return res.status(500).json({
                error: err
              });
            } else {
              const user = new User({
                rols: req.body.Rol,
                username: req.body.Username,
                email: req.body.Email,
                name: req.body.Name,
                lastname: req.body.Lastname,
                password: hash   
              });
              user
                .save()
                .then(result => {
                  console.log(result);
                  res.status(201).json({
                    message: "User created"
                  });
                })
                .catch(err => {
                  console.log(err);
                  res.status(500).json({
                    error: err
                  });
                });
            }
          });
        }
      });
  };
