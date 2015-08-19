/* globals require process console */
"use strict";

var gith = require('gith').create( gith.env.port || 3000 );
var firebase = new require('firebase')( config.firebaseUrl );

var config = require('./config');
var handler = gith({repo: config.repo});

handler.on('all', function(payload){
    // console.log('payload: ', payload);
    firebase.push(payload);
});

