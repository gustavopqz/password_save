const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()
const bcrypt = require(`bcryptjs`)

//Require no model criado
const Login = require('../models/Login')

//Middlewares
app.use(
    express.urlencoded({
        extended: true
    })
)
app.use(express.json())
app.use(cors())

//Rota get - home
app.get('/', (req, res) => {
    res.status(200).json({ message: 'Will the real slim shady please stand up?' })
})

//Rota get todos os cadastros
app.get('/data', async (req, res) =>{
    let response = await Login.find()
    res.status(200).json(response)
})

//Rota get por id
app.get('/data/:id', async (req, res)=>{
    const id = req.params.id
    if(!id){
        res.status(422).json({message: 'ID not found!'})
    }
    let response = await Login.findOne({ _id: id})
    res.status(200).json(response)
})

//Rota get por owner
app.get('/data/:owner', async (req, res)=>{
    const owner = req.params.owner
    if(!owner){
        res.status(422).json({message: 'There is not a user like this!'})
    }
    const response = await Login.find({owner: owner})
    res.status(200).json(response)
})

//Rota post
app.post('/data/create', async (req, res) => {
    const { plataform, owner, user, password, date } = req.body

    const createLogin = {
        plataform,
        owner,
        user,
        password,
        date
    }

    try {
        await Login.create(createLogin)
        res.status(201).json({ message: 'User created!', user: createLogin})
    } catch (error) {
        res.status(500).json({ error: error })
    }
})

//UPDATE POR ID
app.patch('/data/update/:id', async (req, res)=>{
    const id = req.params.id

    const {plataform, owner, user, password, date} = req.body

    const login = {
        plataform,
        owner,
        user,
        password,
        date
    }

    try {
        const updatedLogin = await Login.updateOne({_id: id}, login)

        if(updatedLogin.matchedCount === 0){
            res.status(422).json({message: 'ID not found!'})
            return
        }

        res.status(200).json(login)
    } catch (error) {
        res.status(500).json({ error: error })
    }

})

//DELETE POR ID
app.delete('/data/delete/:id', async (req, res)=>{
    const id = req.params.id

    try {
        const verification = await Login.findOne({_id: id})
        if(!verification){
            res.status(422).json({message: 'ID not found!'})
            return
        }
    } catch (error) {
        console.log(error)
    }


    await Login.deleteOne({_id: id})

    res.status(200).json({message: `User id "${id}" deleted!`})
})

const db_user = process.env.DB_USER
const db_password = process.env.DB_PASSWORD
const db_name = process.env.DB_NAME

//Conexão com o banco de dados
mongoose.connect(`mongodb+srv://${db_user}:${db_password}@pasquacluster.gvpzqhx.mongodb.net/${db_name}?retryWrites=true&w=majority`)
    .then(() => {
        console.log('Connected with database!')
        //Porta
        app.listen(3000, ()=>{
            console.log('Listening at 3000 port.')
        })
    })
    .catch((error) => {
        console.log(error)
    })
