const Beer = require('./../models/beerModel');
const ApiFeatures = require('./../utils/apiFeatures');

// query filter middleware
const aliasBeers = (req, res, next) => {
    req.query.limit = '3';
    req.query.sort = '-ratingAverage';
    req.query.fields = 'name,price,size,ratingAverage';
    next();
};

// beer handlers
const getAllBeers = async (req, res) =>{
    //console.log(req.reqTime);
    try {
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
    } catch(err){
        res.status(404).json({
            status: 'Fail :(',
            message: err
        });
        console.log(err);
    }
};

const getOneBeer = async (req, res) =>{
    //console.log(req.reqTime);
    //const id = req.params.id * 1; // * 1 converte str p/ num
    // const beer = beers.find(el => el.id === id);
    try{
        const beer = await Beer.findById(req.params.id);
        //Beer.findOne({ _id: req.params.id })
        res.status(200).json({
            status: "success",
            data: {
                beers: beer
            }
        });
    } catch(err){
        res.status(404).json({
            status: 'Fail :(',
            message: err
        });
    }
};

const createBeer = async (req, res) =>{

    // const newBeer = new Beer({})
    // newBeer.save()
    try{
        const newBeer = await Beer.create(req.body);
    
        res.status(201).json({
            status: "success",
            data: {
                beers: newBeer
            }
        });

    } catch(err) {
        res.status(400).json({
            status: 'Fail :(',
            message: err
        });
    }   

};    
     
const updateBeer = async (req, res) =>{
    //console.log(req.reqTime);
    try{
        const beer = await Beer.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { 
                new: true,
                runValidators: true 
            }
        );
        
        res.status(200).json({
            status: "success",
            data: {
                beer
            }
        });
    } catch(err){
        res.status(400).json({
            status: 'Fail :(',
            message: err
        });
    }
};

const deleteBeer = async (req, res) =>{
    
    try{
        await Beer.findByIdAndRemove(req.params.id);

        res.status(204).json({
            message: "Beer deleted"
        });
    } catch(err){
        res.status(400).json({
            status: 'Fail :(',
            message: err
        });
    }
};

const beerStats = async (req, res) =>{
    try {
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

    } catch(err){
        res.status(400).json({
            status: 'Fail :(',
            message: err
        }); 
    }
}

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