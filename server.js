const fs = require('fs');
const express = require('express');
const hbs = require('hbs');

const  port = process.env.PORT || 3000;

var app = express();


hbs.registerPartials(__dirname+'/views/partials');

hbs.registerHelper('screamIt',function(){
  console.log('my method called');
  return "called Me!!!"
});


app.set('view engine','hbs');

app.use((req,res,next)=>{

  var now = new Date().toString(),log = `${now} ${req.method} ${req.url}`;

  fs.appendFile('server.log',log+'\n',(err) => {
    if(err){
      console.log("unable to write to server.log");
    }
  });
    next();
})

// app.use((req,res,next) => {
//     res.send("<h1>site is under maintainance</h1>")
// })

app.use(express.static(__dirname+'/public'));

app.get('/',function(req,res){
  res.send("index Page");
});

app.get('/bad',function(req,res){
  res.send('bad page')
});


app.get('/home',function(req,res){
  res.render('home.hbs',{
    pageTitle: 'Home Page',//dynamic content
    welcomeText: "Hello your in home page"
  });
});
app.get('/about',(req,res) => {
  res.render('about.hbs',{
      pageTitle: 'About Page'//dynamic content
  });
});

app.get('/projects',(req,res) => {
  res.render('projects.hbs',{
    pageTitle: 'Projects page'
  })
})


app.get('/htmlContent',(req,res)=>{
  //res.send('<h1>my html content</h1>');
  res.render('home.hbs',{
    pageTitle: 'Home Page',//dynamic content
    welcomeText: "Hello your in home page"
  })
})
app.get('/json',(req,res)=>{
  res.send({
    'key1':'value1'
  });
});

app.listen(port,(arg)=>{
  console.log(`server started :: ${port}`)
})
