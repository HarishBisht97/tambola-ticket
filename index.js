require('dotenv').config()

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const { selectionRoute } = require('./routes')

const port = process.env.PORT

const app = express()

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(bodyParser.text({ type: 'application/xml' }))
app.use(cors())
app.use(express.static('public'))
app.get(selectionRoute(app))
app.listen(port, function () {
	console.log(`Server started on port ${port}`)
})

module.exports = app
