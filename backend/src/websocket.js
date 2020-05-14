const socketio = require('socket.io');
const parseStringAsArray = require('./utils/parseStringAsArray');
const calculateDistance = require('./utils/calculateDistance');


const connections =[];
let io;

exports.SetupWebsocket = (server) =>{
  io = socketio(server);

  io.on('connection', socket =>{
    console.log(socket.id);
    const {latitude, longitude, techs} = socket.handshake.query    
    
    connections.push({
      id: socket.id,
      coordinates: {
        latitude: Number(latitude),
        longitude: Number(longitude)
      },
      techs: parseStringAsArray(techs)
    })

  });
};

exports.FindConnections= (coordinates, techs) => {
  return connections.filter(connection => {
    return calculateDistance(coordinates, connection.coordinates) < 10 
    && connection.techs.some(item => techs.includes(item))
  })
}

exports.SendMessage = (to, message, data) =>{
  to.forEach( connection => {
    io.to(connection.id).emit(message, data);
  })
}