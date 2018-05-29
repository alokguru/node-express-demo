const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();
hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear();
});
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((req, res, next)=>{
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req}`;

    fs.appendFile('server.log', log + '\n');
    
    next();
});

app.get('/', (req, res)=>{
   res.render('home.hbs',{
       pageTitle:'Home Page'
   })
});


app.get('/help',(req, res)=>{
   res.render('help.hbs',{
       pageTitle: 'Help Page'
   });
});
app.listen(3000);