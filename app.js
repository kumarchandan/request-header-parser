var express = require("express");

var app  = express();

var counter = 0;

app.use(function(req, res, next) {
    console.log('Number of Users logged in : ', counter++);
    next();
});

var obj = {
    ipaddress: null,
    language: null,
    software: null
};

app.get('/api/whoami', function(req, res) {
    obj.ipaddress = req.headers['x-forwarded-for'] ||
                    req.connection.remoteAddress   ||
                    req.socket.remoteAddress       ||
                    req.connection.socket.remoteAddress;
    obj.language = req.headers['accept-language'].split(',')[0];
    var software = req.headers['user-agent'];
    obj.software = software.slice(software.indexOf('(') + 1, software.indexOf(')'));
    res.send(obj);
    res.end();
});

app.listen(process.env.PORT);