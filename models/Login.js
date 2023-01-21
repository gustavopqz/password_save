const mongoose = require('mongoose')

const Login = mongoose.model('Login', {
    plataform: String,
    owner: String,
    user: String,
    password: String,
    date: String
})

module.exports = Login