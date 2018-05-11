'use strict'

const express = require('express')
const favicon = require('serve-favicon')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const routes = require('./routes/index')
const faviconURL = `${__dirname}/public/img/node-favicon.png`
const publicDir = express.static(`${__dirname}/public`)
const viewDir = `${__dirname}/views`
const port = (process.env.PORT || 3000)
const app = express()

// configurando app
app.set('views', viewDir)
app.set('view engine', 'ejs')
app.set('port', port)
// ejecutando middlewares
app.use(favicon(faviconURL))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(morgan('dev'))
app.use(publicDir)
// ejecuto el middleware Enrutador
app.use('/', routes)

module.exports = app
