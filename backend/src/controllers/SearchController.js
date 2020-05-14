const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');
module.exports = {
async index(req, res){
  const {latitude, longitude, techs } = req.query;
    
  console.log(latitude, longitude, techs)
  let techsArray = parseStringAsArray(techs);
  console.log(techsArray)
  
  const devs = await Dev.find({
    techs: {
      $in: techsArray,
    },
    location: {
      $near: {
        $geometry: {
          type: 'Point',
          coordinates: [longitude, latitude],
        },
        $maxDistance: 10000,
      },
    },
  });
  //Buscar todos os devs num raio de 10km
  //filtrar por tecnologias
  return res.json({devs});
}
}