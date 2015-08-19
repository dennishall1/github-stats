var config = require('../config');
var Firebase = require('firebase');
var firebase = new Firebase( config.firebaseUrl );

module.exports = function (router) {

    // NOTE: router paths are based on the location of this file
    router.get('/', function (req, res) {
        res.render('index', {
            title: "GitHub Stats",
            body: "... later, we will show actual stats here.  For now, we're just collecting the stats"
        });
    });
    
    router.post('/', function (req, res) {
        console.log('request body', req.body);
        firebase.push(req.body);
        res.send('ok');
    });

};
