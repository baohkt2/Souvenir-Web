// routes/product.routes.js

const { addProduct, updateProduct, deleteProductById, getProductById, deleteAllProducts } = require('../controllers/productController'); 
const { protect } = require('../middlewares/auth');
const { adminRole } = require('../middlewares/role');


const express = require('express');
const { 
  getProducts, 
} = require('../controllers/productController');
const router = express.Router();

router.route('/')
  .get(getProducts)
  .put(protect, adminRole, addProduct)
  .delete(protect, adminRole,deleteAllProducts);

router.route('/:id')
  .get(getProductById)
  .put(protect, adminRole, updateProduct)
  .delete(protect, adminRole, deleteProductById);


module.exports = router;
