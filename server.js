const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const app = express();

app.use((req, res, next)=>{
    const now = new Date().toString();
    const log = `${now} ${req.method} ${req.url}`;
    fs.appendFileSync('server.log',log + '\n',(err)=>{
        console.log("We couldn't append to server.log");
    });

    next();

});

/*
app.use((req,res,next)=>{
    return res.render('error');
});
*/

app.use(express.json());

// SetUp HBS

hbs.registerPartials(__dirname + '/views/partials');

hbs.registerHelper('getCurrentYear', ()=>{
    return new Date().getFullYear()
});
hbs.registerHelper('toUpperCase', (text)=>{
    return text.toUpperCase();
});

app.set('view engine', 'hbs');


// Setup para server

app.use(express.static(__dirname + '/public'));


app.get('/home', (req, res)=>{
    res.render('home.hbs',{
        pageTitle: 'Home',
        footerText: 'Soy un footer',
        headerTitle: 'Matias Navarro - Node'
    });
});


app.get('/projects', (req, res)=>{
    res.render('projects.hbs',{
        pageTitle: 'Projects',
        headerTitle: 'Matias Navarro - Node / Projects'
    });
});

const PORT = process.env.PORT || 3000;
 
app.listen(PORT, ()=>{
    return console.log('Server is running on port 3000');
});