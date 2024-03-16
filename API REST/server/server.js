const express = require('express');
const User = require('../models/User');
require('dotenv').config({path:'../config/.env'})
require('../config/dbConfig');
require('../models/User');

const app= express();

//Middleware qui permet d'extirper les donnees au format JSON pour les convertir en objets JS
app.use(express.json());

//route qui permet de retourner la liste de tous les utilisateurs
app.get('/users', async(request, response)=>{
   let users = await User.find(); 
   response.send(users);
})

//route qui permet d'ajouter un nouvel utilisateur
app.post('/users', async (request, response)=>{
    if(request.body.name && request.body.email){
         let newUser = new User({
            name : request.body.name,
            email : request.body.email
         })

        await newUser.save().then((doc)=>{
            console.log(doc)
         }).catch((err)=>{
            console.error(err)
         })
       response.send('ceci est un ajout de l\'utilisateur'+newUser);
    }else{
        response.send('echec de l\'ajout');
    }
})

//route qui permet de mettre a jour un utilisateur
app.put('/users/:_id',async (request,response)=>{
      let user = await User.findOne({_id:request.params._id})
      console.log(user);
      let newUser = await User.findOneAndUpdate({_id:request.params._id},{name:request.body.name,email:request.body.email},{new:true});
      console.log(newUser);
      
      response.send('ceci est un put')
})

//route qui permet de supprimer un utilisateur
app.delete('/users/:_id',async (request,response)=>{
    let user = await User.findOne({_id:request.params._id})
    await User.deleteOne(user);
    response.send('ceci est un delete')
})


app.listen(process.env.PORT,()=>{
    console.log('server started at port :'+process.env.PORT)
})