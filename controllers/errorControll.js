const AppError = require('./../utils/appError');

const handleCastErrDB = err => { 
    const message = `Invalid ${err.path}: ${err.value}.`;
    return new AppError(message, 400);
};

const handleDuplField = err => { // Transforma erro vindo do DB
    const value = JSON.stringify(err.keyValue);
    //console.log(value);
    const message = `Duplicate field value: ${value}`;
    return new AppError(message, 400);
};

const handleInvalidField = err => {
    const errors = Object.values(err.errors); //.map(el => el.message);
    console.log(errors);
    const message = `Invalid input data: ${errors.join(', ')}`;
    return new AppError(message, 400);
};

const handleJwtErro = err => new AppError('Não autorizado!! ...', 401);

const handleJwtExpiredTk = err => new AppError('Tempo expirado, relogue!!', 401);

const sendErrDev = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack
    });
};

const sendErrProd = (err, res) => {
    // Operational erro para o client
    if (err.isOperational) {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message
        });
    } else { 
        console.error("Error !!", err);
        // Erro generico ... (no operational)
        res.status(500).json({
            status: 'error',
            message: 'Algo deu errado ;)'
        });
    }
};

// Global Error Handling Mid
module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
    
    if(process.env.NODE_ENV === 'development'){
       sendErrDev(err, res); 
    } else if(process.env.NODE_ENV === 'production') {
        let error = Object.assign(err); //{ ...err } || JSON.parse(JSON.stringify(err));

        if(error.name === 'CastError') error = handleCastErrDB(error);
        if(error.code === 11000) error = handleDuplField(error);
        if(error.name === 'ValidationError') error = handleInvalidField(error);

        // JWT
        if(error.name === 'JsonWebTokenError') error = handleJwtErro(error);
        if(error.name === 'TokenExpiredError') error = handleJwtExpiredTk(error);

        sendErrProd(error, res);
        // err = CastError --> handleCastErrDB --> sendErrProd ...
    }
};
// Global Error Handling Mid
