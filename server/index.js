require('dotenv').config()
const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const cookieParser = require('cookie-parser')

const connectDB = require('./config/db')

const app = express()

const corsOptions = {
    origin: process.env.CLIENT_BASE_URL
}

app.use(cors(corsOptions))
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static('uploads'));

app.use('/api', require('./routes/auth'))
app.use('/api', require('./routes/stream'))

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`REST API RUNNING ON PORT: ${PORT}`)
    connectDB()
})

