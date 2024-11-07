// controllers/userController.js
require('dotenv').config();
const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const generateToken = require('../utils/generateToken');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); 

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

const setTokenCookie = (res, tokenName, tokenValue, expiresIn) => {
  res.cookie(tokenName, tokenValue, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    expires: new Date(Date.now() + expiresIn),
    path: '/'
  });
};

const createUserTokenCookies = async (res, userId) => {
  const { accessToken, refreshToken } = generateToken(userId);

  // Instead of hashing the refresh token, save it encrypted or in secure storage
  await User.findByIdAndUpdate(userId, { refreshToken });

  setTokenCookie(res, 'accessToken', accessToken, 15 * 60 * 1000); // 15 minutes
  setTokenCookie(res, 'refreshToken', refreshToken, 7 * 24 * 60 * 60 * 1000); // 7 days
};


const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, address, phone, role } = req.body;
  if (await User.findOne({ email })) {
    res.status(400).json({ message: 'User already exists' });
    return;
  }

  const user = await User.create({ name, email, password: await hashPassword(password), address, phone, role});
  if (user) {
    res.status(201).json({ _id: user._id, name, email, role });
  } else {
    res.status(400).json({ message: 'Invalid user data' });
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    await createUserTokenCookies(res, user._id);
    console.log('Login Successfully');
    res.json({ _id: user._id, name: user.name, email: user.email });
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
});

const logoutUser = asyncHandler(async (req, res) => {
  if (!req.user || !req.user._id) {
    // Người dùng không xác thực hoặc không có thông tin _id
    return res.status(401).json({ message: 'User not authenticated' });
  }
  // Clear refresh token for the current user
  await User.findByIdAndUpdate(req.user._id, { refreshToken: null });
  res.clearCookie('accessToken').clearCookie('refreshToken').status(200).json({ message: 'User logged out successfully' });
});

const deleteUserById = asyncHandler(async (req, res) => {
  const userId = req.params.id;

  // Tìm và xóa người dùng theo ID
  const user = await User.findByIdAndDelete(userId);

  if (user) {
    res.json({ message: 'User deleted successfully' });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

const refreshUser = asyncHandler(async (req, res, next) => {
  const refreshToken = req.cookies['refreshToken'];
  if (!refreshToken) {
      return res.status(400).json({ message: 'Refresh Token is required' });
  }

  try {
      const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN_SECRET);
      const user = await User.findById(decoded.id);

      if (!user) {
          return res.status(401).json({ message: 'User not found' });
      }

      // Tạo mới accessToken và refreshToken
      const { accessToken, refreshToken: newRefreshToken } = generateToken(user._id);
      await User.findByIdAndUpdate(user._id, { refreshToken: newRefreshToken });

      // Cập nhật cookies
      setTokenCookie(res, 'accessToken', accessToken, 15 * 60 * 1000); // 15 minutes
      setTokenCookie(res, 'refreshToken', newRefreshToken, 7 * 24 * 60 * 60 * 1000); // 7 days

      res.status(200).json({ message: 'Tokens refreshed successfully' });
  } catch (error) {
      if (error.name === 'TokenExpiredError') {
          res.status(401).json({ message: 'Refresh Token has expired' });
      } else if (error.name === 'JsonWebTokenError') {
          res.status(401).json({ message: 'Invalid Refresh Token' });
      } else {
          next(error);
      }
  }
});



const changePassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const user = await User.findById(req.user._id);

  if (user && (await bcrypt.compare(oldPassword, user.password))) {
    user.password = await hashPassword(newPassword);
    user.refreshToken = null;
    await user.save();
    await createUserTokenCookies(res, user._id);
    res.status(200).json({ message: 'Password changed successfully' });
  } else {
    res.status(401).json({ message: 'Your old password is incorrect' });
  }
});

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id, 'id name email address phone role');
  user ? res.json(user) : res.status(404).json({ message: 'User not found' });
});

const getUserProfileById = asyncHandler(async (req, res) => {
  const userId = req.params.id; // Lấy ID từ parameters

  try {
      const user = await User.findById(userId, 'name email address phone role');

      if (!user) {
          res.status(404).json({ message: 'User not found' });
      } else {
          res.json({
              _id: user._id,
              name: user.name,
              email: user.email,
              address: user.address,
              phone: user.phone,
              role: user.role
          });
      }
  } catch (error) {
      res.status(500).json({ message: 'Error retrieving user profile' });
  }
});

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.body._id || req.user._id);

  if (user) {
    // Cập nhật thông tin người dùng từ request body
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = await bcrypt.hash(req.body.password, 10);
    }
    // Thêm các trường thông tin khác nếu cần

    // Lưu thông tin người dùng sau khi cập nhật
    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      // Gửi thêm các thông tin khác nếu cần
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});


const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

const createManager = asyncHandler(async (req, res) => {
  // Assuming createManager is a static method on User model
  req.user.role = 'manager';
  await registerUser(req, res);
});

module.exports = { registerUser, loginUser, logoutUser, refreshUser, changePassword, getUserProfile, getAllUsers, createManager, updateUserProfile, getUserProfileById, deleteUserById };