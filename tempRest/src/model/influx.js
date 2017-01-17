const Influx = require('influx');
const express = require('express');
const http = require('http');
const os = require('os');

const app = express();


influx = new Influx.InfluxDB(
{
    host: '10.2.0.4',
    database: 'mydb',
    port: 8086,
    username: 'xxxxxx',
    password: 'xxxxxx',
    schema: [
        {
            measurement: 'temperature',
            fields:
            {
                location: Influx.FieldType.STRING,
                value: Influx.FieldType.INTEGER
            },
            tags: [
        'node'
      ]
    }
  ]
});

function writeToDB(location, value)
{
    //console.log(location);
    //console.log(value);

    influx.writeMeasurement('temperature', [
        {
            fields:
            {
                location: location,
                value: value
            }
  }
]);
}

module.exports = writeToDB;
