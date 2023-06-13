// const Beer = require('./../models/beerModel');
// const catchAsync = require('./../utils/catchAsync');

const getOverview = catchAsync( async(req, res, next) =>{  
   
    const beer = await Beer.find();

    //console.log(beer);
    //res.set('Content-Type', 'text/html');
    res.status(200).render('overview', {
        title: 'OverView Beers',
        beer
    });
});

const getOneOverview = catchAsync( async(req, res, next) =>{
    
    const beer = await Beer.findOne({ bier: req.params.bier }).populate({
        path: 'review',
        fields: 'review rating user'
    });

    res.status(200).render('beer', {
        title: 'OverView Beer',
        beer
    });
});

// module.exports = {
//     getOverview,
//     getOneOverview
// }