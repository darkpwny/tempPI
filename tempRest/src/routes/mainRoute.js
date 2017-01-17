var express = require('express');
var authRouter = express.Router();
var influx = require("../model/influx.js");


var router = function ()
{
    var getIndex = function (req, res)
    {
        res.render('index');
    };

    var recievedPost = function (req, res)
    {
        //  console.log("Received Post Data");
        // console.log(req.body);

        influx(req.body.Sensor, req.body.Temperature)
        res.render('index');

    };

    authRouter.route('/')
        .get(getIndex)
        .post(recievedPost);

    return authRouter;
};

module.exports = router;