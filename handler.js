/* globals require process console */
"use strict";

var config = require('./config');

var gith = require('gith').create( process.env.PORT || 3000 );
var firebase = new require('firebase')( config.firebaseUrl );

var handler = gith({repo: config.repo});

handler.on('all', function(payload){
    // console.log('payload: ', payload);
    firebase.push(payload);
});

