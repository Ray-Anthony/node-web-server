const express = require('express');
const hbs     = require('hbs');
const fs      = require('fs');

const port = process.env.PORT || 3000;
const app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

hbs.registerHelper('getCurrentYear', () => new Date().getFullYear());
hbs.registerHelper('screamIt', (text) => text.toUpperCase());

// Middleware
app.use((req, res, next) => {
    let now = new Date().toString();
    let log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err) {
            console.log('Unable to append to server.log')
        }
    })
    next();
});

// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

// Routes

// app.get('/', (request, response) => {
//     response.send({
//         name: 'Ray',
//         age: 31,
//         likes: ['Bad bitches', 'Happy trees']
//     })
// });

app.get('/', (request, response) => { 
    response.render("home.hbs", {
        pageTitle: 'Home Page',
        welcomeMessage: 'This is my welcome message.',
    });
});

app.get('/about', (request, response) => { 
    response.render("about.hbs", {
        pageTitle: 'About Page',
    });
});

app.listen(port, () =>{
    console.log('Server is running on port', port);
});