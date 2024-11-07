const express = require('express');
const cors = require('cors');
const app = express();
const errorHandlerMiddleware = require('./src/middlewares/errorHandler');
const userRoutes = require('./src/routes/user.routes');
const productRoutes = require('./src/routes/product.routes'); // Assuming you have this file for product routes
const orderRoutes = require('./src/routes/order.routes'); // Assuming you have this file for order routes
const router = express.Router();
const cookieParser = require('cookie-parser');
require('dotenv').config();
// Use body parser middleware to parse JSON and form-data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// Use CORS middleware for cross-origin requests
app.use(cors());

// Define protected routes using the Router
// Mount the router on the '/api' path
app.use('/api', router);
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

// Use error handling middleware last to catch any unhandled errors
app.use(errorHandlerMiddleware);

module.exports = app;
