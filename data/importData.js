const fs = require('fs');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config({ path: './config.env'});
const Beer = require('./../models/beerModel');

//console.log(process.env);

mongoose
.connect(process.env.DATABASE_LOCAL) // config.env
.then(() => {
    console.log('Db connection successful!');
})
.catch(err => console.log(err))

//read json file 
const beers = JSON.parse(fs.readFileSync(`${__dirname}/beer.json`, 'utf-8'));

//import data to db
const importData = async () => {
    try {
        await Beer.create(beers);
        console.log('Data loaded :)');
    } catch(err) {
        console.log(err);
    }
    process.exit();
}

//delete existing data
const deleteExistData = async () => {
    try {
        await Beer.deleteMany();
        console.log('Data deleted :)');
    } catch(err) {
        console.log(err);
    }
    process.exit();
}


if (process.argv[2] === '--import') {
    importData();
} else if (process.argv[2] === '--delete') {
    deleteData();
}

console.log(process.argv);

// $ node importData --import // load data in db
// $ node importData --delete // delete data in db