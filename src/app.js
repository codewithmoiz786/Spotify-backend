const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const path = require('path')
const cors = require('cors')
const Authroutes = require('../src/routes/auth.route')
const musicRoutes = require('../src/routes/music.route')

app.use(cors())
app.use(express.static(path.join(__dirname, 'frontend')));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())


app.use("/auth", Authroutes)
app.use("/music", musicRoutes)








module.exports = app