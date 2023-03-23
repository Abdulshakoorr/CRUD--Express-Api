const e = require('express');
const express = require('express')
const app = express()
const morgan = require('morgan')
const data = require('./data.json')
app.use(morgan('dev'))
app.use(express.json()) // for parsing application/json
// app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
// app.use(express.static('public'))


// all users 

app.get('/api/users', (req, res) => {
    res.status(200).json(data)
})

// single  users 
app.get('/api/users/:id', (req, res) => {
    const id = Number(req.params.id);
    const singleUser = data.find(user => user.id === id);
    console.log(singleUser)
    res.status(200).send(singleUser)
})

// post users 
app.post('/api/users', (req, res) => {
    // console.log(req.body)
    const addData = req.body;
    data.push(addData)
    res.status(201).json({ message: 'post'})
})

// put update users but override the existing user
app.put('/api/users/:id', (req, res) => {
    const id = +req.params.id;
    const updateUser = data.findIndex(user => user.id === id);
    data.splice(updateUser,1,{...req.body, id:id})
    // console.log(updateUser)/
    res.status(201).json({message: 'updated user'})
})

// patch update users but do not override the existing user
app.patch('/api/users/:id', (req, res) => {
    const id = +req.params.id;
    const updateUser = data.findIndex(user => user.id === id);
    // console.log(updateUser)
    const dataID = data[updateUser]
    // console.log(dataID)
    data.splice(updateUser,1,{...data,...req.body})
    // // console.log(updateUser)/
    res.status(201).json({message: 'updated user'})
})

// delete users 
app.delete('/api/users/:id', (req, res) => {
    const id = +req.params.id;
    const usersLeft = data.filter((user) => user.id !== id);
    res.status(200).json(usersLeft)
})

app.listen(3000,()=>{
    console.log(`server listening on port http://localhost:${3000}`)
})