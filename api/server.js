var express = require('express');
var responses = require('./controllers/responseController');
const app = express();
var bodyParser = require('body-parser');
const authenticateToken = require('./security');
const excludedRoutes = ['/users', '/login'];



app.use(bodyParser.json({ limit: '150mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '150mb', extended: true }))
app.use(function(req, res, next) {
    console.log('My Headers', req.headers)
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin,refresh_token,appKey X-Requested-With, Content-Type, X-Auth-Token,Accept,Authorization,token,access-token");
    next();
});


app.use((req, res, next) => {
    
    if (excludedRoutes.includes(req.path)) {
        next();
    } else {
        authenticateToken(req, res, next);
    }
});

app.use('/', require('./routes'));
app.use(function(req, res, next) {
    res.send(responses.get(404, "Invalid!", null, false));
});

app.set('port',process.env.PORT);

var server = app.listen(app.get('port'), function() {
    console.log('Waiting for request');
});
