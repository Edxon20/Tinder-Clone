const PORT = 8000
const express = require('express');
const { MongoClient } = require('mongodb')
const url = 'mongodb+srv://Ragnar20:mongotinderclone123@cluster0.pz01qgs.mongodb.net/Cluster0?retryWrites=true&w=majority'

const app = express()

app.get('/', (req, res) => {
    res.json('Hello to my app')
})

app.post('/signup', (req, res) => {
    res.json('Hello to my app')
})
// --------------------------------------------------------
// these can be used to template
app.get('/users', async(req, res) => {
    const client = new MongoClient(url)

    try{
        await client.connect()
        const database = client.db('app-data')
        const users = database.collection('users')

        const returnedUsers = await users.find().toArray()
        res.send(returnedUsers)
    } finally{
        await client.close()
    }        
})
// -----------------------------------------------------------




app.listen(PORT,() => console.log('Server running on PORT ' + PORT))