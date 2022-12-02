const express = require('express');
const morgan = require('morgan');

const beerRouter = require('./routes/beerRoutes');
const AppError = require('./utils/appError');
const globErrHandler = require('./controllers/errorControll');

const app = express();

if(process.env.NODE_ENV === 'development'){
app.use(morgan('dev'));
};

app.use(express.json());

//app.use(express.static(`${__dirname}/static`));

app.use((req, res, next) =>{
    req.reqTime = new Date().toString();
    next();
})

app.use('/api/v1/beer', beerRouter);

app.all('*', (req, res, next) => {
    res.status(404).json({
        status: 'Fail!!!',
        message: `Not Found ${req.originalUrl}`
    });
});

app.use(globErrHandler); // errorControll 

                        
//WORKFLOW        
//REQUEST --> APP.JS --> ROUTERS --> CONTROLLERS --> RESPONSE ...

//ERROR WORKFLOW
//REQUEST --> APP.JS --> errorControll.js --> RESPONSE ...

module.exports = app;