const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();
app.set('view engine','hbs');
hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('scream',(text)=> {
  return text.toUpperCase();
});
hbs.registerHelper('getYear',()=>{
  return (new Date().toString());
});
app.use(express.static(__dirname + '/public'));

app.use((req,res,next)=> {
  var now = new Date().toString();
  var log = `${now}: ${req.method} , ${req.url}`;
fs.appendFileSync('server.log',log + '\n');
    next();
});


app.get('/',(req,res)=> {
  res.render('home.hbs',{

    title: 'Home Page',
    welcome: 'Welcome to our page'
  });
});


app.get('/about',(req,res)=> {
  res.render('about.hbs',{

    title: 'About US',
    welcome: 'We are web developers!'
  })
});
app.listen(3000,()=> {
  console.log('Server running on port 3000');
});
