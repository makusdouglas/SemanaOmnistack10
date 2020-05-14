const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const http = require('http');
const cors = require('cors');
const {SetupWebsocket} = require('./websocket')


const app = express();
const server = http.Server(app)

SetupWebsocket(server)

mongoose.connect('mongodb+srv://user:user@meuserver-6yjam.mongodb.net/week10?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
})

app.use(cors());
app.use(express.json());
app.use(routes);
server.listen(3333);