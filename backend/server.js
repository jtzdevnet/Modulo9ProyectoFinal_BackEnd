// app.js or server.js
import express from 'express';
import usersRoutes from '../routes/usersRoutes.js';
import venuesRoutes from '../routes/venuesRoutes.js';
import amenitiesRoutes from '../routes/amenitiesRoutes.js';
import reservationsRoutes from '../routes/reservationsRoutes.js';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

var options = {
  "origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 204
}
app.use(cors(options));

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
};

app.use(allowCrossDomain);


// Use the users route
app.use('/api/users', cors(), usersRoutes);
app.use('/api/venues', venuesRoutes);
app.use('/api/amenities', amenitiesRoutes);
app.use('/api/reservations', reservationsRoutes);

const port = 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));