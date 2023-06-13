const mongoose = require('mongoose');
const Beer = require('./beerModel');
// fields
// review, rating, createdAt, ref to beer, ref to user ...

const reviewSchema = new mongoose.Schema({
    review: {
        type: String,
        maxlength: [50, "A review não pode ser maior que isso"],
        required: true
    },
    rating: {
        type: Number,
        default: 1.0,
        required: true,
        max: [10, 'A avaliação maxima é 10'],
        min: [1, 'A avaliação minima é 1']
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'a review deve ser de um user']
    },
    beer:{
        type: mongoose.Schema.ObjectId,
        ref: 'Beer',
        required: [true, 'a review deve ser de uma Beer']
    }
},
{
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
}
);

reviewSchema.index({ beer: 1, user: 1 }, { unique: true });

// calcula média de ratingAverage(beerModel)
// acessa a current review, extrai o beerId e depois modifica
reviewSchema.statics.calcAverageRatings = async function(beerId) {
    const stats = await this.aggregate([
        {
            $match: { beer: beerId}
        },
        {
            $group: {
                _id: '$beer',
                numRating: { $sum: 1 },
                avgRating: { $avg: '$rating' }
            }
        }
    ]);
    //console.log(stats);
    // salva depois calcular
    if(stats.length > 0){
    await Beer.findByIdAndUpdate(beerId, {
        ratingAverage: stats[0].numRating,
        ratingQuantity: stats[0].avgRating
    });
    } else {
        await Beer.findByIdAndUpdate(beerId, {
            ratingAverage: 0,
            ratingQuantity: 1.0
        });    
    }

}

// chama o static method calcAverageRatings
reviewSchema.post('save', function(){
        //constructor aponta para o Model
    this.constructor.calcAverageRatings(this.beer);
});

// findByIdAndUpdate
// findByIdAndDelete
reviewSchema.pre(/^findOneAnd/, async function(next){
    const current = await this.findOne() // transfere o doc atual para o post mid abaixo
    next();
}); 

reviewSchema.post(/^findOneAnd/, async function(){
    // atualiza os fields ratingAverage e ratingQuantity
    await this.current.constructor.calcAverageRatings(this.current.beer) 
});


reviewSchema.virtual('beers', {
    ref: 'Beer',  //model
    foreignField: 'reviews', //field in model Beer
    localField: '_id'
});
// vituals faz o mesmo que o de cima
// reviewSchema.pre(/^find/, function(next) {

//     this.populate({
//         path: 'user',
//         select: 'name'
//     }).populate({
//         path: 'beer',
//         select: 'name price'
//     })

//     next();
// });

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;