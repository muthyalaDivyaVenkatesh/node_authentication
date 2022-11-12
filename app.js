const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
var cors = require('cors')


const app = express()



// rotes
const authRoutes = require('./routes/auth')



app.use(bodyParser.json())
app.use(cookieParser('123456789'))
app.use(cors( {"preflightContinue": true})); 

// cofigre res
app.use((req, res, next) => {
    console.log("hi ")
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Credentials',true);    
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
    next();
});


app.use(authRoutes)

let dbConnection = (async () =>{
    await mongoose.connect("mongodb://localhost/dog_store")
    app.listen(8080)
    console.log("DB_COONECTED")
})()