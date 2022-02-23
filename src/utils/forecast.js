const request = require('request');

const forecast = (latitude, longitude, callback) => {

    const url = "http://api.weatherstack.com/current?access_key=408247db8eb4813b88de5e8ec933a483&query="+ latitude +","+ longitude;
    request({url, json: true}, (error, {body}) => {

        if(error){
            callback("unable to connect weather service");
        }    
        else{
    
            if(body.error){
    
                callback("unable to find location");
            }
            else{
                const data = body.current;
                callback(undefined, data.weather_descriptions[0] + ". it is currently: " + data.temperature + " degree out. it feels like: " + data.feelslike + " degree");
            }
        }
    });
}
module.exports = forecast;