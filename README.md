# 🎁 Memory - Souvenir Web Application

Một ứng dụng web bán hàng quà lưu niệm được phát triển với kiến trúc Full-stack, bao gồm backend API và hai frontend riêng biệt cho khách hàng và admin.

## 📋 Mục lục

- [Tổng quan](#tổng-quan)
- [Tính năng](#tính-năng)
- [Công nghệ sử dung](#công-nghệ-sử-dụng)
- [Cấu trúc dự án](#cấu-trúc-dự-án)
- [Cài đặt](#cài-đặt)
- [Sử dụng](#sử-dụng)
- [API Documentation](#api-documentation)
- [Đóng góp](#đóng-góp)
- [Tác giả](#tác-giả)

## 🌟 Tổng quan

Memory là một nền tảng thương mại điện tử chuyên về các sản phẩm quà lưu niệm độc đáo và ý nghĩa. Dự án được xây dựng với mục đích tạo ra những trải nghiệm không thể quên thông qua từng sản phẩm, giúp khách hàng lưu giữ những kỷ niệm đáng nhớ.

## ✨ Tính năng

### Frontend Khách hàng
- 🏠 **Trang chủ**: Hiển thị sản phẩm nổi bật và banner quảng cáo
- 🛍️ **Danh sách sản phẩm**: Xem, tìm kiếm và lọc sản phẩm theo danh mục
- 🔍 **Chi tiết sản phẩm**: Thông tin chi tiết sản phẩm với khả năng thêm vào giỏ hàng
- 🛒 **Giỏ hàng**: Quản lý sản phẩm trong giỏ hàng, cập nhật số lượng
- 💳 **Thanh toán**: Quy trình đặt hàng với thông tin giao hàng
- 👤 **Quản lý tài khoản**: Đăng ký, đăng nhập, cập nhật thông tin cá nhân
- 📦 **Theo dõi đơn hàng**: Xem lịch sử và chi tiết đơn hàng
- 📞 **Liên hệ**: Thông tin liên hệ và hỗ trợ khách hàng

### Frontend Admin
- 📊 **Dashboard**: Tổng quan hệ thống và thống kê
- 📦 **Quản lý sản phẩm**: CRUD sản phẩm (Thêm, xem, sửa, xóa)
- 👥 **Quản lý người dùng**: Quản lý tài khoản khách hàng
- 🛒 **Quản lý đơn hàng**: Xử lý và theo dõi đơn hàng
- 📞 **Quản lý liên hệ**: Xử lý yêu cầu hỗ trợ từ khách hàng
- 👤 **Quản lý profile**: Cập nhật thông tin admin

### Backend API
- 🔐 **Authentication**: Xác thực và phân quyền người dùng
- 🛍️ **Product Service**: API quản lý sản phẩm
- 📦 **Order Service**: API xử lý đơn hàng
- 👤 **User Service**: API quản lý người dùng
- 🗄️ **Database**: Tích hợp MongoDB

## 🛠️ Công nghệ sử dụng

### Backend
- **Node.js**: Runtime JavaScript
- **Express.js**: Web framework
- **MongoDB**: Cơ sở dữ liệu NoSQL
- **Cors**: Xử lý Cross-Origin Resource Sharing
- **Nodemon**: Development tool

### Frontend
- **Vue.js 3**: Progressive JavaScript framework
- **Vue Router**: Định tuyến ứng dụng
- **Pinia**: State management
- **Vite**: Build tool và development server
- **Bootstrap 5**: CSS framework
- **FontAwesome**: Icon library
- **Axios**: HTTP client

### Development Tools
- **Vite**: Modern build tool
- **Nodemon**: Auto-restart development server

## 📁 Cấu trúc dự án

```
Souvenir-Web/
├── BACKEND/
│   ├── package.json
│   ├── server.js
│   └── app/
│       ├── config/
│       │   └── index.js
│       ├── services/
│       │   └── product.service.js
│       └── utils/
│           └── mongodb.util.js
│
├── FRONTEND/
│   ├── frontend_admin/          # Admin Panel
│   │   ├── src/
│   │   │   ├── components/      # Shared components
│   │   │   ├── views/          # Page components
│   │   │   ├── services/       # API services
│   │   │   ├── stores/         # Pinia stores
│   │   │   ├── router/         # Vue Router config
│   │   │   └── assets/         # Static assets
│   │   ├── package.json
│   │   └── vite.config.ts
│   │
│   └── frontend_customer/       # Customer Interface
│       ├── src/
│       │   ├── components/      # Shared components
│       │   ├── views/          # Page components
│       │   ├── services/       # API services
│       │   ├── stores/         # Pinia stores
│       │   ├── router/         # Vue Router config
│       │   └── assets/         # Static assets
│       ├── package.json
│       └── vite.config.js
│
└── README.md
```

## 🚀 Cài đặt

### Yêu cầu hệ thống
- Node.js (v14 hoặc cao hơn)
- MongoDB (v4.0 hoặc cao hơn)
- npm hoặc yarn

### 1. Clone repository
```bash
git clone https://github.com/baohkt2/Souvenir-Web.git
cd Souvenir-Web
```

### 2. Cài đặt Backend
```bash
cd BACKEND
npm install
```

### 3. Cài đặt Frontend Admin
```bash
cd ../FRONTEND/frontend_admin
npm install
```

### 4. Cài đặt Frontend Customer
```bash
cd ../frontend_customer
npm install
```

### 5. Cấu hình Database
- Đảm bảo MongoDB đang chạy trên hệ thống
- Cấu hình connection string trong `BACKEND/app/config/index.js`

## 🎯 Sử dụng

### Chạy Backend
```bash
cd BACKEND
npm start
```
Server sẽ chạy trên port được cấu hình (mặc định: port trong config)

### Chạy Frontend Admin
```bash
cd FRONTEND/frontend_admin
npm run dev
```
Admin panel sẽ chạy trên `http://localhost:5173` (hoặc port khác)

### Chạy Frontend Customer
```bash
cd FRONTEND/frontend_customer
npm run dev
```
Customer interface sẽ chạy trên `http://localhost:5174` (hoặc port khác)

### Build Production
```bash
# Build admin
cd FRONTEND/frontend_admin
npm run build

# Build customer
cd ../frontend_customer
npm run build
```

## 📚 API Documentation

### Endpoints chính

#### Products
- `GET /api/products` - Lấy danh sách sản phẩm
- `GET /api/products/:id` - Lấy chi tiết sản phẩm
- `POST /api/products` - Tạo sản phẩm mới (Admin)
- `PUT /api/products/:id` - Cập nhật sản phẩm (Admin)
- `DELETE /api/products/:id` - Xóa sản phẩm (Admin)

#### Orders
- `GET /api/orders` - Lấy danh sách đơn hàng
- `GET /api/orders/:id` - Lấy chi tiết đơn hàng
- `POST /api/orders` - Tạo đơn hàng mới
- `PUT /api/orders/:id` - Cập nhật đơn hàng

#### Users
- `POST /api/users/register` - Đăng ký tài khoản
- `POST /api/users/login` - Đăng nhập
- `GET /api/users/profile` - Lấy thông tin profile
- `PUT /api/users/profile` - Cập nhật profile

## 🎨 Danh mục sản phẩm

- **Gấu Bông** - Các sản phẩm gấu bông đáng yêu
- **Quà Valentine** - Quà tặng ngày lễ tình nhân
- **Vòng Tay** - Trang sức vòng tay ý nghĩa
- **Nến thơm** - Nến thơm tạo không khí lãng mạn
- **Thiệp** - Thiệp chúc mừng các dịp đặc biệt
- **Quà Giáng sinh** - Quà tặng mùa lễ hội

## 👨‍💻 Đóng góp

1. Fork dự án
2. Tạo branch cho feature mới (`git checkout -b feature/AmazingFeature`)
3. Commit thay đổi (`git commit -m 'Add some AmazingFeature'`)
4. Push lên branch (`git push origin feature/AmazingFeature`)
5. Tạo Pull Request

## 📝 License

Dự án này thuộc quyền sở hữu của tác giả. Vui lòng liên hệ để biết thêm thông tin về quyền sử dụng.

## 👤 Tác giả

**Nguyễn Hoài Bảo**
- GitHub: [@baohkt2](https://github.com/baohkt2)
- Repository: [Souvenir-Web](https://github.com/baohkt2/Souvenir-Web)

## 📞 Hỗ trợ

Nếu bạn gặp vấn đề hoặc có câu hỏi, vui lòng:
1. Tạo issue trên GitHub
2. Liên hệ trực tiếp với tác giả

---

⭐ **Nếu dự án hữu ích, hãy cho một star để ủng hộ!** ⭐
