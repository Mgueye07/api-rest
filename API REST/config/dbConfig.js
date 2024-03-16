const mongoose = require('mongoose');

//fonction qui permet de se connecter avec la base de donnees 
mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log('database connection successful !');
}).catch((err)=>{
    console.error(err);
});
