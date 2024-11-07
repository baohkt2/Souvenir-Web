// routes/orderRoutes.js

const express = require('express');
const { protect } = require('../middlewares/auth');
const router = express.Router();
const {addOrder, deleteOrderById, deleteAllOrders, getOrderById, updateOrderToPaid , findAllOrders, updateOrderToDelivered, findUserOrders} = require('../controllers/orderController');
const {adminRole} = require('../middlewares/role'); // Make sure the path is correct

// @route POST /api/orders
// @desc Create new order
// @access Private
router.post('/', protect, addOrder);
router.get('/', protect, findUserOrders);
router.get('/all',protect, adminRole, findAllOrders);

// @route GET /api/orders/:id
// @desc Get order by ID
// @access Private
router.get('/:id', protect, getOrderById);
router.put('/:id/pay', protect,adminRole ,updateOrderToPaid);
router.put('/:id/deliver', protect, adminRole, updateOrderToDelivered);
router.delete('/:id', protect, adminRole, deleteOrderById);
router.delete('/', protect, adminRole, deleteAllOrders);

module.exports = router;
