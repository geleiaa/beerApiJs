const mongoose = require('mongoose');
//const slugify = require('slugify');

//mongoose schema
const beerSchema = new mongoose.Schema({
    // image: {
    //     type: String
    //     //required: [true, 'A beer precisa de uma image']
    // },
    nome: {
        type: String,
        required: [true, 'A beer precisa de nome'],
        unique: true,
        maxlength: [20, 'O nome da beer pode ter no maximo 20 caracteres'], 
        minlength: [3, 'O nome da beer deve ter no minimo 5 caracteres']
    },
    tipo: {
        type: String,
        required: [true, 'A beer precisa de tipo']
    },
    mililitros: {
        type: Number,
        default: 300,
        required: [true, 'A Beer precisa do size (ml)']
    },
    preco: {
        type: Number,
        require: true,
        default: 1.99
    },
    nota: {
        type: Number,
        require: true,
        default: 1.0,
        max: [10, 'A avaliação maxima é 10'],
        min: [1, 'A avaliação minima é 1']
    },
    quantidadeDeNotas: {
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
    // discountPrice: {
    //     type: Number,
    //     validate: { // Essa validation só funciona quando criar um new obj (ñ com update)
    //         validator: function(val) {
    //             return val < this.price
    //         },
    //         message: 'O desconto é maior que o preço'
    //     }
    // },
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
*/

const Beer = mongoose.model('Beer', beerSchema); // 1° letra upercase p/ models

module.exports = Beer;