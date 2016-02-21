#!/usr/bin/env node

var path = require('path');
var express = require('express');
var contentDisposition = require('content-disposition');
var pkg = require( path.join(__dirname, 'package.json') );
var http = require('http');
var fs = require("fs");
var scan = require('./scan');

// Parse command line options

var program = require('commander');

program
  .version(pkg.version)
  .option('-p, --port <port>', 'Port on which to listen to (defaults to 15595)', parseInt)
  .parse(process.argv);

var port = program.port || 15595;

var ROOTDIR = './static';
var ROOTALIAS = 'cloud';

var bingUrl = {expire: (new Date()).getTime() + 86400000};

console.log('Next bing wallpaper available at ' + bingUrl.expire);

// Scan ROOTDIR in which the static files are located. Then add ROOTALIAS to all
// files and folders, so that download links point to our ROOTALIAS route

// [optional]: scan only once
// var tree = scan(ROOTDIR, ROOTALIAS);


// Ceate a new express app

var app = express();

// Serve static files from the frontend folder

app.use('/', express.static(path.join(__dirname, 'frontend')));

// Serve files from the current directory under the /files route

app.use('/'+ROOTALIAS, express.static(ROOTDIR, {
  index: false,
  setHeaders: function(res, path){
    // Set header to force files to download
    res.setHeader('Content-Disposition', contentDisposition(path))
  }
}));

// This endpoint is requested by our frontend JS

app.get('/scan', function(req,res){
  var tree = scan(ROOTDIR, ROOTALIAS);
  res.send(tree);
});

// Bing proxy for background wallpaper

app.get('/wallpaper', function(req,res){
  if ((new Date()).getTime() < bingUrl.expire && bingUrl.url) {
    res.redirect(bingUrl.url);
  } else {
    var url = 'http://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1&mkt=en-US';
    http.get(url, function(resBing){
      var body = '';

      resBing.on('data', function(chunk){
        body += chunk;
      });

      resBing.on('end', function(){
        var data = JSON.parse(body);
        bingUrl = {
          url: 'https://www.bing.com' + data.images[0].url,
          expire: (new Date()).getTime() + 86400000
        };
        res.redirect(bingUrl.url);
      });
    }).on('error', function(e){
      bingUrl = {
        expire: (new Date()).getTime() + 86400000
      };
      res.redirect('/');
    });
  }
});

// Everything is setup. Listen on the port.

app.listen(port);

console.log('Karma is running on port ' + port);
