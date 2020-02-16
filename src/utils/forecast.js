const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = "https://api.darksky.net/forecast/87b0124727c237d4d4b3e34fb2e47146/" + latitude + "," + longitude + "?units=si"

    request({ url, json: true}, (error, { body }) => {
        if(error) {
            callback("Could not access the weather service!", undefined)
        }else if(body.error) {
            callback("Unable to find location", undefined)
        }else {
            callback(undefined, body.daily.data[0].summary + " It is currently " + body.currently.temperature + " degrees outside and there is a " + body.currently.precipProbability + "% chance of rain!")
        }
    })
}

module.exports = forecast

