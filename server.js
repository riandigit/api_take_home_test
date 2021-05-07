const express = require('express')
const app = express()

const config = require('./config/config')
const port = config.port

var bodyParser = require('body-parser')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


let apiRoutes = require("./config/routes")

app.use('/', apiRoutes)



app.listen(port, () => console.log(`This app listening on port ${port}!`))
