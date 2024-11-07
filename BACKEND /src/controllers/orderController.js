// controllers/orderController.js

const Order = require('../models/Order');
const asyncHandler = require('express-async-handler');

const sendError = (res, status, message) => res.status(status).json({ message });

// Tạo đơn hàng mới
const addOrder = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (!orderItems || orderItems.length === 0) {
    return sendError(res, 400, 'No order items');
  }

  const order = new Order({
    orderItems,
    user: req.user._id,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  });
  const createdOrder = await order.save();
  res.status(201).json(createdOrder);
});

// Lấy thông tin đơn hàng theo ID
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate('user', 'name email');

  if (!order) {
    return sendError(res, 404, 'Order not found');
  }

  res.json(order);
});

// Cập nhật trạng thái đơn hàng là đã giao
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return sendError(res, 404, 'Order not found');
  }

  order.isDelivered = true;
  order.deliveredAt = Date.now();
  const updatedOrder = await order.save();
  res.json(updatedOrder);
});

// Cập nhật trạng thái đơn hàng là đã thanh toán
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return sendError(res, 404, 'Order not found');
  }

  order.isPaid = true;
  order.paidAt = Date.now();
  order.paymentResult = {
    id: req.body.id, 
    status: req.body.status, 
    update_time: req.body.update_time, 
    email_address: req.body.payer?.email_address, 
  };

  const updatedOrder = await order.save();
  res.json(updatedOrder);
});

const findAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate('user', 'name email');

  if (orders.length === 0) {
    return res.status(200).json([]);
  }

  res.json(orders);
});

const findUserOrders = asyncHandler(async (req, res) => {
  const userId = req.user._id; // Lấy ID của người dùng từ request

  // Tìm tất cả các đơn hàng mà trường user trùng với userId
  const orders = await Order.find({ user: userId }).populate('user', 'name email');

  // Kiểm tra xem có đơn hàng nào không
  if (!orders || orders.length === 0) {
    return res.status(404).json({ message: 'No orders found for this user' });
  }
  console.log(orders);
  // Gửi danh sách các đơn hàng tới client
  res.status(200).json(orders);
});


const deleteOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findByIdAndDelete(req.params.id);

  if (!order) {
    return sendError(res, 404, 'Order not found');
  }
  res.json({ message: 'Order removed' });
});

const deleteAllOrders = asyncHandler(async (req, res) => {
  await Order.deleteMany({});
  res.json({ message: 'All orders have been deleted' });
});
module.exports = { addOrder, deleteOrderById, deleteAllOrders, getOrderById, updateOrderToDelivered, updateOrderToPaid, findAllOrders, findUserOrders };
