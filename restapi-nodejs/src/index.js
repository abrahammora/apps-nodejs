/*Required express to create the server*/
const express = require('express');
const app = express();
/*Require morgan (middleware)*/
const morgan = require('morgan');

//settings
app.set('port', process.env.PORT || 3000);
app.set('json spaces', 2);

// middlewares
app.use(morgan('dev'));
//data from input form
app.use(express.urlencoded({extended: false}));
//content json
app.use(express.json());

//routes
app.use(require('./routes/index.js'));
app.use('/api/movies',require('./routes/movies'));
app.use('/api/users',require('./routes/users'));


// starting the server
app.listen(app.get('port'),() => {
    console.log(`Server on port ${3000}`);
});