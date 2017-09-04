const express        = require('express');
const bodyParser     = require('body-parser');
const app            = express();
var fs = require("fs");
const port = 8000;


app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.get('/list', function (req, res) {
   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
       console.log( data );
       res.end( data );
   });
})


app.post('/add', function (req, res) {
   // First read existing users.
   var reqdata = req.body;
   console.log(reqdata);
    fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
       data = JSON.parse( data );
       data["user4"] = reqdata;
       console.log( data );
       res.end( JSON.stringify(data));
   });
});

app.delete('/delete/:id', function (req, res) {

   // First read existing users.
   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
       data = JSON.parse( data );
       delete data["user" + req.params.id];

       console.log( data );
       res.end( JSON.stringify(data));
   });
});

app.get('/:id', function (req, res) {
   // First read existing users.
   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
      var users = JSON.parse( data );
      var user = users["user" + req.params.id]
      console.log( user );
      res.end( JSON.stringify(user));
   });
});


app.listen(port, function() {
  console.log('We are live on ' + port);
});
