/*jslint node:true */
/*jshint node:true */

// SETUP ****************************************************************************************
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var cookieParser = require('cookie-parser');
var session = require('express-session');

var port = process.env.PORT || 5000;

var mainRouter = require('./src/routes/mainRoute.js')();


function CustomError(err, req, res, next)
{
    res.send('Argh Cyclons..');
}

//Express setup (set static, render engine, view directory etc********************************************

app.use(express.static('public'));
app.use(bodyParser.json()); //POST JSON
app.use(bodyParser.urlencoded()); //QUERYSTRUING URL

app.use(cookieParser());
app.use(session(
{
    secret: 'library'
}));

app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use('/iot', mainRouter);
//app.use(CustomError);

//Start Listner****************************************************************************************
app.listen(port, function (err)
{
    console.log('Nothing but the rain...' + port);
});
