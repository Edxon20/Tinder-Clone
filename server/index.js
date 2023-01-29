const PORT = 8000
const bcrypt = require('bcryptjs/dist/bcrypt');
const express = require('express');
const app = express()
const { v1: uuidv4} = require('uuid')
const jwt = require('jsonwebtoken')
const cors = require('cors')

const { MongoClient } = require('mongodb')
const url = 'mongodb+srv://Ragnar20:mongotinderclone123@cluster0.pz01qgs.mongodb.net/Cluster0?retryWrites=true&w=majority'



app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.json('Hello my app')
})

app.post('/signup', async (req, res) => {
    const client = new MongoClient(url)
    const { email, password} = req.body    

    const generateduserId = uuidv4()
    const hashedpassword = await bcrypt.hash(password, 10)

    try {
        await client.connect()
        const database = client.db('app-data')
        const users = database.collection('users')

        const existingUser = await users.findOne({email})

        if (existingUser) {
            return res.status(409).send('User already exists. Please login')
        }

        const sanitizedEmail = email.toLowerCase()

        const data = {
            user_id: generateduserId,
            email: sanitizedEmail,
            hashed_password: hashedpassword
        }

        const insertedUser = await users.insertOne(data)

        const token = jwt.sign(insertedUser, sanitizedEmail, {
            expiresIn: 60 * 24
        })
        res.status(201).json({token, userId: generateduserId})

    } catch (err) {
        console.log(err)
    } finally {
        await client.close()
    }
})
// --------------------------------------------------------
// these can be used to template
// Here returned the users
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