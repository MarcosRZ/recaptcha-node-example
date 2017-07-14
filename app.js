var express = require('express');
var bodyParser = require('body-parser')
var path = require('path')
var fs = require('fs')
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

    res.send('<h1>Hello, ' + req.body.name + '</h1>')

})

app.use('/', express.static(path.join(__dirname, 'public')))

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});