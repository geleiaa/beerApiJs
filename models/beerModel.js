const mongoose = require('mongoose');
const slugify = require('slugify');

//mongoose schema
const beerSchema = new mongoose.Schema({
    image: {
        type: String,
        required: [true, 'A beer precisa de uma image']
    },
    name: {
        type: String,
        required: [true, 'A beer precisa de nome'],
        unique: true,
        maxlength: [20, 'O nome da beer pode ter no maximo 20 caracteres'], 
        minlength: [3, 'O nome da beer deve ter no minimo 5 caracteres']
    },
    type: {
        type: String,
        required: [true, 'A beer precisa de tipo']
    },
    size: {
        type: Number,
        default: 300,
        required: [true, 'A Beer precisa do size (ml)']
    },
    price: {
        type: Number,
        require: true,
        default: 1.99
    },
    ratingAverage: {
        type: Number,
        require: true,
        default: 1.0,
        max: [10, 'A avaliação maxima é 10'],
        min: [1, 'A avaliação minima é 1']
    },
    ratingQuantity: {
        type: Number,
        require: true,
        default: 0
    },
    review: {
        type: String,
        required: [true, 'A Beer precisa do comentario'],
        trim: true,
        maxlength: [40, 'O comentario pode ter no maximo 20 caracteres'], 
        minlength: [5, 'O comentario deve ter no minimo 5 caracteres']
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    discountPrice: {
        type: Number,
        validate: { // Essa validation só funciona quando criar um new obj (ñ com update)
            validator: function(val) {
                return val < this.price
            },
            message: 'O desconto é maior que o preço'
        }
    },
    // slug: String,
    // secretBeer: {
    //     type: Boolean,
    //     default: false
    // }
}, 
{
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});
//mongoose schema

/*
//Document Mid
// Só funciona para save() e create()
beerSchema.pre('save', function(next) {
    this.slug = slugify(this.name, {lower: true});
    next();
})

beerSchema.post('save', function(doc, next){
    console.log(doc);
    next();
})
//Document Mid

//Query Mid
beerSchema.pre(/^find/, function(next) {
    this.find({ secretBeer: { $ne: true } });
    this.start = Date.now();
    next()
});

beerSchema.post(/^find/, function(doc, next) { 
    console.log(`A query demorou ${Date.now() - this.start} miliseconds`);
    //console.log(doc);
    next();
});
//Query Mid

beerSchema.pre('aggregate', function(next){
    this.pipeline().unshift({ $match: { secretBeer: { $ne: true} } });
    //console.log(this.pipeline());
    next();
})

//Virtuals
beerSchema.virtual('fullCaract').get(function() {
  return this.name + ', ' + this.size + 'ml' + ', ' + this.price
});
//Virtuals
*/

const Beer = mongoose.model('Beer', beerSchema); // 1° letra upercase p/ models

module.exports = Beer;