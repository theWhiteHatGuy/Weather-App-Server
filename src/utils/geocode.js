const request = require('request')  //brings request module to make https requests way easier

const geocode = (address, callback) => {        //function geocode takes two parameters, address and callback
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoiZGV2aXNhZ28iLCJhIjoiY2s2MTE1cHlqMDl2bzNsdWZwaWwwYXRyOCJ9.XKyIX5Dzi7DBBQkRbbXk1Q"    //the geo API url

    request({url, json: true}, (error, { body }) => {       //makes http request to the specified url and imports json file, the second parameter is the response
        if(error) {                         //in case there is an error, in case there are no match, in case of success does the following
            callback('Unable to connect to location services!', undefined)
        }else if(body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        }else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}
 
module.exports = geocode