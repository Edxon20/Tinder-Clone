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

app.post('/login', async (req, res) => {
    const client = new MongoClient(url)
    const {email, password} = req.body

    try {
        await client.connect()
        const database = client.db('app-data')
        const users = database.collection('users')

        const user = await users.findOne({email})

        const correctPassword = await bcrypt.compare(password, user.hashed_password)

        if (user && correctPassword) {
            const token = jwt.sign(user, email, {
                expiresIn: 60 * 24
            })
            res.status(201).json({token, userId: user.user_id})
        }

        res.status(400).json('Invalid Credentials')

    } catch (err) {
        console.log(err)
    } finally {
        await client.close()
    }
})

// --------------------------------------------------------------------------------------------
// Put to update data
app.put('/user', async (req, res) => {

    const client = new MongoClient(url)
    const formData = req.body.formData

    try{
        await client.connect()
        const database = client.db('app-data')
        const users = database.collection('users')

        const query = { user_id: formData.user_id}
        const updateDocument = {
            $set: {
                first_name: formData.first_name,
                dob_day: formData.dob_day,
                dob_month: formData.dob_month,
                dob_year: formData.dob_year,
                show_gender: formData.show_gender,
                gender_identity: formData.gender_identity,
                gender_interest: formData.gender_interest,
                url: formData.url,
                about: formData.about,
                matches: formData.matches               
                },
            }
            //Before any Mongo funcion we neeed use await. 
            const insertedUser = await users.updateOne(query, updateDocument)
            res.send(insertedUser)
        } finally{
            await client.close()
        }

})

// ------------------------------------------------------------------------------------

app.get('/user', async (req, res) => {
    const client = new MongoClient(url)
    const userId = req.query.userId
    
    try {
        await client.connect()
        const database = client.db('app-data')
        const users = database.collection('users')

        const query = {user_id: userId}
        const user = await users.findOne(query)
        res.send(user)

    } finally {
        await client.close()
    }
})

app.listen(PORT,() => console.log('Server running on PORT ' + PORT))