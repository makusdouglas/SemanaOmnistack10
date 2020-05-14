const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');
const { FindConnections, SendMessage } = require('../websocket')

module.exports={

//São permitidas no maximo 5 funçoes por controller, sao elas:
// index,
// show,
// store,
// update,
// e destroy.

  async index(req, res){
    const devs = await Dev.find();
    return res.json(devs);
  },

  async store(req, res){
    const {github_username, techs, latitude, longitude} = req.body;

    let dev = await Dev.findOne({ github_username });

    if(!dev){
      const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`)
    console.log(apiResponse.data);
  
    const {name =login, avatar_url, bio} = apiResponse.data;
  
    const techsArray = parseStringAsArray(techs);
  
    const location = {
      type: 'Point',
      coordinates: [longitude, latitude],
    }
  
     dev = await Dev.create({
      github_username,
      name,
      avatar_url,
      bio,
      techs: techsArray,
      location
    });

    //Filtrar as conexões que estao há no maximo 10km de distancia,
    // e que o novo dev tenha pelo menos uma das techs filtradas.
      const sendSocketMessageTo = FindConnections(
        {latitude, longitude},
        techsArray,
      )
      SendMessage(sendSocketMessageTo, 'new-dev', dev)
    }
  
    return res.json(dev)
  },
  async update(req, res){
    const {github_username, 
            name, 
            bio, 
            avatar_url, 
            techs, 
            latitude, 
            longitude} = req.body;
    let dev = await Dev.findOne({github_username});
    const techsArray = parseStringAsArray(techs);
    const location = {
      type: 'Point',
      coordinates: [longitude, latitude],
    }

    if(dev){
      
      const result = await Dev.updateOne({github_username},{
        name,
        avatar_url,
        techs: techsArray,
        location
      })
      
      return res.json({result});
    }
    return res.status(401).json({error: 'User not found'})
  },
  
  
  async destroy(req, res){
    const {github_username} = req.body;

    const dev = await Dev.findOne({github_username});

    if(dev){
      const result = await Dev.deleteOne({github_username});


      return res.json({result});
    }
    return res.status(401).json({error: 'User not found'})




  },
}