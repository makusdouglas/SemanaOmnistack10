const { Router } = require('express');
const DevConstroler = require('./controllers/DevController');
const SearchController = require('./controllers/SearchController');

const routes = Router();


//Metodos: GET, PUT, POST, DELETE

/*Tipos de parametos:

Querry Params: req.query
Route Params: req.params
Body: req.body
*/
routes.get('/devs',DevConstroler.index)
routes.post('/devs',DevConstroler.store);
routes.put('/devs',DevConstroler.update);
routes.delete('/devs',DevConstroler.destroy);
routes.get('/search', SearchController.index);



module.exports = routes;