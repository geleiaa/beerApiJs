const Review = require('./../models/reviewModel');
// const catchAsync = require('./../utils/catchAsync');
// const AppError = require('./../utils/appError');
const Factory = require('./../controllers/handlerFactory');


const MidSetBeerAndUserIds = (req, res, next) =>{

    if(!req.body.beer) req.body.beer = req.params.beerId;
    if(!req.body.user) req.body.user = req.user.id; // Nested Routes

    next();
}

const getReviews = Factory.getAll(Review);
const getOneReview = Factory.getOne(Review);
const createReview = Factory.createOne(Review);
const updateReview = Factory.updateOne(Review);
const deleteReview = Factory.deleteOne(Review);

module.exports = {
    getReviews,
    createReview,
    getOneReview,
    deleteReview,
    updateReview,
    MidSetBeerAndUserIds
}
