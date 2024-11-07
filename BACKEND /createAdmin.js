const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./src/models/User'); // Đường dẫn đến model User của bạn

async function createAdminUser() {
  try {
    // Kết nối với MongoDB
    await mongoose.connect('mongodb://localhost:27017/QuanLidathang', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Hash mật khẩu
    const hashedPassword = await bcrypt.hash('xinchao123', 12); // Thay 'admin-password' bằng mật khẩu bạn muốn

    // Tạo user admin mới
    const adminUser = new User({
      hoTenKH: 'Admin',
      email: 'admin@example.com',
      password: hashedPassword,
      role: 'admin' // Đặt giá trị của role là 'admin'
      // Điền thêm thông tin nếu cần thiết
    });

    // Lưu user admin
    await adminUser.save();

    console.log('Admin user created!');
  } catch (error) {
    console.error('Error creating admin user', error);
  } finally {
    // Đóng kết nối với cơ sở dữ liệu
    mongoose.connection.close();
  }
}

// Gọi hàm để tạo user admin
createAdminUser();
