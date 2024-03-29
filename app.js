const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const beerRouter = require('./routes/beerRoutes');
const globErrHandler = require('./controllers/errorControll');

const app = express();


// sec http headers
app.use(helmet());

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
};

// rate-limit mid
const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: 'Você bateu o rate-limit kkkk'
});

app.use('/api', limiter);

//body-parser
app.use(express.json());

// query sanitize
app.use(mongoSanitize());

// xss prevent
app.use(xss());

// prevent parameter polution
app.use(hpp({
    whitelist: [
        'name',
        'type',
        'size',
        'price',
        'ratingAverage'
    ]
}));

//app.use(express.static(`${__dirname}/static`));

//test mid
app.use((req, res, next) => {
    req.reqTime = new Date().toString();
    next();
})

// swagger docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// swagger docs

app.use('/api/v1/beer', beerRouter);

// default error
app.all('*', (req, res, next) => {
    res.status(404).json({
        status: 'Fail!!!',
        message: `Not Found ${req.originalUrl}`
    });
});

app.use(globErrHandler); // errorControll 


module.exports = app;