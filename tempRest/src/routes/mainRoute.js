var express = require('express');
var authRouter = express.Router();
var influx = require("../model/influx.js");
var fs = require("fs");

var sensorFile = 'src/config/sensor.json';

var router = function ()
{
    var getIndex = function (req, res)
    {
        res.render('index');
    };

    var recievedPost = function (req, res)
    {
        console.log("Received Post Data");
        console.log(req.body);

        influx(req.body.Sensor, req.body.Temperature)
        res.render('index');

    };

    var getTimer = function (req, res)
    {
        var data = JSON.parse(fs.readFileSync(sensorFile));
        var id = req.params.id

        if (data.hasOwnProperty(id))
        {
            //res.contentType('application/json');
        }
        else
        {
            //SET DEFAULT TIME OF 5 mins
            data[id] = '{\"time\": 300}';
            fs.writeFileSync(sensorFile, JSON.stringify(data));
        }
        res.send(JSON.stringify(data[id]));
        res.end();
    }

    authRouter.route('/')
        .get(getIndex)
        .post(recievedPost);


    authRouter.route('/Sensors/:id')
        .get(getTimer);

    return authRouter;
};

module.exports = router;