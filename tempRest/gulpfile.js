/*jslint node:true */
/*jshint node:true */
'use strict';

var gulp = require('gulp');
var jsHint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var inject = require('gulp-inject');
var nodemon = require('gulp-nodemon');

var jsFiles = ['*.js'];


var envJson = {
    'PORT': 3000
};

function checkStyle()
{
    gulp.src(jsFiles)
        .pipe(jsHint())
        .pipe(jsHint.reporter('jshint-stylish',
        {
            verbose: true
        }))
        .pipe(jscs())
        .pipe(jscs.reporter());
}

function serveMe()
{
    var options = {
        script: 'app.js',
        delayTime: 1,
        env: envJson,
        watch: jsFiles
    };
    return nodemon(options).on('restart', function (ev)
    {
        gulp.start('style');
        console.log('jump...');
    });
}

gulp.task('style', checkStyle);

gulp.task('serve', serveMe);