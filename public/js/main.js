(function(){

    // todo - read from shared config.
    // config.js
    var config = {
        firebaseUrl: "https://sweltering-heat-1762.firebaseio.com/"
    };

    var firebase = new Firebase(config.firebaseUrl);
    var renderPoint = document.getElementById('output');
    var templateContainer = document.getElementById('template');

    // listen for template ready event
    window.addEventListener('template-ready', onTemplateReady);

    // if the template ready event already fired, proceed
    if(templateContainer.classList.contains('loaded')){
        onTemplateReady();
    }

    function onTemplateReady (e) {

        window.removeEventListener('template-ready', onTemplateReady);

        var template = Handlebars.compile(templateContainer.contentWindow.document.body.innerHTML);

        firebase.on("value", function(snapshot) {
            var data = snapshot.val();
            var pullRequests = {};

            Object.keys(data).forEach(function(key){
                var item = data[key];
                // we only care about pull requests
                if(!item.pull_request){
                    return;
                }
                var branch = item.pull_request.head.ref;
                pullRequests[branch] = pullRequests[branch] || {branch:branch, events:[]};
                pullRequests[branch].events.push(item);
            });

            renderPoint.innerHTML = template({pullRequests: Object.keys(pullRequests).map(function(key){
                return pullRequests[key];
            })});
        });

    }


})();
