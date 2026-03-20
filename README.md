# 🛒 Dự án Shop - Ecommerce Fullstack

Dự án website thương mại điện tử được xây dựng với mô hình MVC, cho phép người dùng xem sản phẩm, thêm vào giỏ hàng và quản lý thanh toán.

## 🚀 Công nghệ sử dụng

### Frontend
- **React 18** - Xây dựng giao diện người dùng
- **React Router DOM** - Quản lý điều hướng
- **Axios** - Gọi API từ backend
- **CSS Modules** - Styling components

### Backend
- **Node.js** - Môi trường chạy JavaScript
- **Express 4** - Framework xây dựng RESTful API
- **MVC Pattern** - Tổ chức mã nguồn khoa học

### Database
- **MongoDB** - Cơ sở dữ liệu NoSQL
- **Mongoose** - ODM cho MongoDB
- **MongoDB Community Server** - Chạy local

### Công cụ hỗ trợ
- **Nodemon** - Tự động restart server khi code thay đổi
- **Dotenv** - Quản lý biến môi trường
- **CORS** - Xử lý Cross-Origin Resource Sharing

## 📁 Cấu trúc thư mục


Shop/
├── client/ # Frontend React
│ ├── public/ # Static files
│ ├── src/
│ │ ├── components/ # Components dùng chung
│ │ │ ├── Header.js
│ │ │ ├── Footer.js
│ │ │ └── ProductCard.js
│ │ ├── pages/ # Các trang chính
│ │ │ ├── HomePage.js
│ │ │ ├── ProductPage.js
│ │ │ ├── CartPage.js
│ │ │ └── CheckoutPage.js
│ │ ├── services/ # Gọi API
│ │ │ └── api.js
│ │ ├── App.js
│ │ └── index.js
│ └── package.json
│
└── backend/ # Backend Node.js/Express
├── models/ # Schema MongoDB
│ ├── Product.js
│ └── Order.js
├── controllers/ # Xử lý logic
│ └── productController.js
├── routes/ # Định tuyến API
│ └── productRoutes.js
├── config/ # Cấu hình database
│ └── db.js
├── .env # Biến môi trường
├── server.js # Entry point
└── package.json