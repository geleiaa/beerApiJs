const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config({ path: './config.env'});
const app = require('./app');

//console.log(process.env);

//connect local db with mongoose
mongoose
.connect(process.env.DATABASE_LOCAL) // config.env
/*{ 
    userNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
}*/
.then(() => {
    //console.log(con.connections);
    console.log('Db connection successful!');
})
.catch(err => console.log(err))


// server         
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server up, port ${port}`);
});