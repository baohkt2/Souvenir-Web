const asyncHandler = require('express-async-handler');
const Product = require('../models/Product');

const getProducts = asyncHandler(async (req, res) => {
  const page = Math.max(parseInt(req.query.page) || 1, 1);
  const limit = Math.max(parseInt(req.query.limit) || 10, 1);
  const category = req.query.category;
  const search = req.query.search;
  let query = {};

  // Thêm điều kiện tìm kiếm theo tên sản phẩm (nếu có)
  if (search) {
    query.name = { $regex: search, $options: 'i' }; // $regex cung cấp khả năng tìm kiếm linh hoạt
  }

  // Thêm điều kiện lọc theo danh mục (nếu có)
  if (category && category !== 'getAll') {
    query.category = category;
  }
  
  const total = await Product.countDocuments(query);
  const products = await Product.find(query)
    .skip((page - 1) * limit)
    .limit(limit);

  res.json({
    page,
    limit,
    totalPages: Math.ceil(total / limit),
    totalProducts: total,
    products
  });
});




// @desc    Fetch single product by ID
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Add a new product
// @route   POST /api/products
// @access  Private/Admin
const addProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } = req.body;

  const product = new Product({
    name,
    price,
    user: req.user._id, 
    image,
    brand,
    category,
    countInStock,
    numReviews: 0,
    description,
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    res.status(200).json(updatedProduct);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProductById = asyncHandler(async (req, res) => {

  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Product removed' });
  } catch (err) {
    res.status(404);
    throw new Error('Product not found');
  }
});

const deleteAllProducts = asyncHandler(async (req, res) => {
  await Product.deleteMany();
  res.status(200).json({ message: 'All orders have been deleted' });
});

module.exports = {
  getProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProductById,
  deleteAllProducts
};
