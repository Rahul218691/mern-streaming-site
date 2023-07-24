require('dotenv').config()
const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const cookieParser = require('cookie-parser')

const connectDB = require('./config/db')

const app = express()

const corsOptions = {
    credentials: true,
    origin: process.env.CLIENT_BASE_URL
}

app.use(cors())
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use('/api', require('./routes/auth'))

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`REST API RUNNING ON PORT: ${PORT}`)
    connectDB()
})

