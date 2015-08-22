var config = require('../config');
var Firebase = require('firebase');
var firebase = new Firebase( config.firebaseUrl );

module.exports = function (router) {

    // NOTE: router paths are based on the location of this file
    router.get('/', function (req, res) {
        res.render('index', {
            title: "GitHub Stats"
        });
    });
    
    router.post('/', function (req, res) {
        // tack on a property to track what time it is when we receive the notification
        req.body.received_at = (new Date()).toISOString();
        console.log('request body', req.body);
        firebase.push(req.body);
        res.send('ok');
    });

};
