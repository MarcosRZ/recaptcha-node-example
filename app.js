var express = require('express');
var bodyParser = require('body-parser')
var path = require('path')
var fs = require('fs')
var request = require('request');
var app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.post('/contact', (req, res) => {

    console.log(req.body)

    // verificar recaptcha

    var recaptchaResponse = req.body['g-recaptcha-response']
    
    request.post(
        'https://www.google.com/recaptcha/api/siteverify',
        {form:{
            secret: '6Ldf_CgUAAAAADG449nsbrd1UhhnHCsKj2UxMxNm',
            response: recaptchaResponse
        }},
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(body)
                res.send('<h1>Hello, ' + req.body.name + '</h1>')
            }
        }
    );
})

app.use('/', express.static(path.join(__dirname, 'public')))

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

// module.exports = app