const Beer = require('./../models/beerModel');
const ApiFeatures = require('./../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

// query filter middleware
const aliasBeers = (req, res, next) => {
    req.query.limit = '3';
    req.query.sort = '-ratingAverage';
    req.query.fields = 'name,price,size,ratingAverage';
    next();
};

// beer handlers
const getAllBeers = catchAsync(async (req, res) =>{
    //console.log(req.reqTime);
        // cria new Obj ApiFeatures com mongoose query e route query
        // depois chama os metodos do Obj formando a query
        // no fim execute query com await
        const features = new ApiFeatures(Beer.find(), req.query)
        .filter()
        .sort() 
        .limitFields()
        .paginate();


        const beers = await features.query;

        res.status(200).json({
                status: "success",
                results: beers.length,
                //time: req.reqTime,
                data: {
                    beers
                }
            });
});

const getOneBeer = catchAsync(async (req, res) =>{
    //console.log(req.reqTime);
    const beer = await Beer.findById(req.params.id);
    //Beer.findOne({ _id: req.params.id })

    if (!beer) {
        return next(new AppError('No found beer with that ID', 404));
    }          // next() manda para o global err handling

    res.status(200).json({
        status: "success",
        data: {
            beers: beer
        }
    });
});

const createBeer = catchAsync (async (req, res) =>{

    const newBeer = await Beer.create(req.body);

    res.status(201).json({
        status: "success",
        data: {
            beers: newBeer
        }
    });   
});    
     
const updateBeer = catchAsync(async (req, res) =>{
    //console.log(req.reqTime);
    
    const beer = await Beer.findByIdAndUpdate(
        req.params.id, 
        req.body, 
        { 
            new: true,
            runValidators: true 
        }
    );

    if (!beer) {
        return next(new AppError('No found beer with that ID', 404));
    }
        
    res.status(200).json({
        status: "success",
        data: {
            beer
        }
    });
});

const deleteBeer = catchAsync(async (req, res) =>{
    
    const beer = await Beer.findByIdAndRemove(req.params.id);

    if (!beer) {
        return next(new AppError('No found beer with that ID', 404));
    }

    res.status(204).json({
        status: "success",
        message: "Beer deleted",
        data: beer
    });
});

const beerStats = catchAsync(async (req, res) =>{
        const stats = await Beer.aggregate([
            {
                $match: { ratingAverage: { $gte: 5 }}
            },
            {
                $group: {
                    _id: null,
                    //_id: '$size',
                    numBeers: { $sum: 1},
                    numRating: { $sum: '$ratingQuantity'},
                    avgRating: { $avg: '$ratingAverage' },
                    avgPrice: { $avg: '$price' },
                    minPrice: { $min: '$price' },
                    maxPrice: { $max: '$price' }
                }
            }
        ])

        res.status(200).json({
            status: "success",
            //time: req.reqTime,
            data: {
                stats
            }
        });
});

//Business Problem Function ...
// const businessPlan = async (req, res) =>{
//     try{
//         const year = req.params.year * 1;
//         const plan = await Beer.aggregate([
//             {
//                 $unwind: '$startDates'
//             },
//             {
//                 $match: {
//                     startDates: {
//                       $gte: new Date(`${year}-01-01`),
//                       $lte: new Date(`${year}-12-31`)
//                     }
//                 }    
//             },
//             {
//                 $group: {
//                     _id: { $month: '$startDates' },
//                     numStart: { $sum: 1 },
//                     field: { $push: '$name' }
//                 }
//             },
//             {
//                 $addFields: { month: '$_id'}
//             },
//             {
//                 $project: {
//                     _id: 0
//                 }
//             },
//             {
//                 $sort: { algumaDate: -1}
//             }
//         ]);

//         res.status(200).json({
//             status: "success",
//             //time: req.reqTime,
//             data: {
//                 data
//             }
//         })  

//     } catch(err){
//         res.status(400).json({
//             status: 'Fail :(',
//             message: err
//         }); 
//     }
// }
//Business Problem Function ...


module.exports = {
    getAllBeers,
    getOneBeer,
    createBeer,
    updateBeer,
    deleteBeer,
    aliasBeers,
    beerStats
}