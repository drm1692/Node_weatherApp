const path = require('path')
const express = require('express')
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
//define path for express configuration
const pathToFollow = path.join(__dirname,'../public');
const viewpath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//setup handlebar engine and view location
app.set("view engine", ".hbs");
app.set("views", viewpath); 
hbs.registerPartials(partialsPath);

//setup static directory to serve
app.use(express.static(pathToFollow));

app.get('', (req, res) => {

    res.render("index", {

        title: "weather app",
        createdBy: "Divy Majithiya"
    });
});

app.get('/about', (req, res) => {

    res.render("about", {

        title: "About page",
        createdBy: "Divy Majithiya"
    })
})

app.get('/help', (req, res) => {

    res.render("help", {
        title: "Help page",
        Message: "this is help page, how can i help you?",
        createdBy: "Divy Majithiya"

    })
})
app.get('/weather', (req, res) => {

    const address = req.query.address;
    if(!address){

        return res.send({
            error: "please provide address"
        });
    }
    geocode(address, (error, data) => {

        if(error){

            return res.send({ error })
        }
        forecast(data.latitude, data.longitude, (error, forecastData) => {

            if(error){

                return res.send({ error })
            }
            res.send({

                location: data.location,
                forecast: forecastData 
            })
        })
    })
});

app.get('*', (req,res) => {

    res.send("Page not found, error 404")
})

app.listen(3000, () => {

    console.log("Server is up on port 3000");
});