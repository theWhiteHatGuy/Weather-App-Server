const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//serving static directory
app.use(express.static(publicDirectoryPath))

//setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


app.get('', (req, res) => {
    res.render('index')
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        message: 'THIS IS A HELP MESSAGE'
    })
})

app.get('/weather', (req, res) => {

    if(!req.query.address) {
        return res.send({
            error: 'You did not provide an address!'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error) {
            return res.send({ error })
        }
        
        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send({ error })
            }

            return res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/about', (req, res)=> {
    res.render('about')
})

//Targets all the routes that have not been defined
app.get('/help/*', (req, res) => {
    res.render('404', {
        errorName: '404 Help Article Not Found!'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        errorName: '404 Page not found!'
    })
})

app.listen(port, () => {
    console.log('Server started on port ' + port)
})