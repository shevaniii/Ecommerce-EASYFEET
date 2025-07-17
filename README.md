# 👟 EASYFEET - E-commerce Platform

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/3536caea-4d37-40f0-9b74-412c69312244" />


## 🚀 Live Demo

- **Frontend**: (https://ecommerce-easyfeet.vercel.app/)
- **Backend**: (https://easyfeet-shoes.onrender.com)

## 📋 Table of Contents

- [About The Project](#about-the-project)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Deployment](#deployment)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## 🌟 About The Project

EASYFEET is a modern, responsive e-commerce platform specializing in footwear. The project provides a seamless shopping experience with features like user authentication, product management, shopping cart functionality, and secure payment processing.

### 🎯 Project Goals

- Create a user-friendly online shopping platform
- Implement secure authentication and authorization
- Provide efficient product search and filtering
- Enable smooth checkout and payment process
- Ensure responsive design across all devices

## ✨ Features

### 🔐 User Authentication
- User registration and login
- JWT token-based authentication
- Password reset functionality
- User profile management

### 🛍️ Product Management
- Product catalog with categories
- Product search and filtering
- Product details with images
- Reviews and ratings system
- Inventory management

### 🛒 Shopping Cart
- Add/remove items from cart
- Update quantities
- Calculate totals and taxes
- Save cart for later

### 💳 Payment & Checkout(Future updation)
- Secure payment gateway integration
- Multiple payment methods
- Order tracking
- Order history

### 📱 Additional Features(future updation)
- Responsive design
- Admin dashboard
- Email notifications
- Wishlist functionality
- Product recommendations

## 🛠️ Tech Stack

### Frontend
- **React.js** - Frontend framework
- **Redux/Context API** - State management
- **React Router** - Navigation
- **Axios** - HTTP client
- **Material-UI/Tailwind CSS** - UI components
- **React Hook Form** - Form handling

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Stripe/PayPal** - Payment processing(for future need)

### Tools & Services
- **Vercel** - Frontend deployment
- **Render** - Backend deployment
- **MongoDB Atlas** - Database hosting
- **Cloudinary** - Image storage
- **Postman** - API testing
- **Git** - Version control

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:
- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [MongoDB](https://www.mongodb.com/) (local or Atlas)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/shevaniii/Ecommerce-EASYFEET.git
   cd Ecommerce-EASYFEET
   ```

2. **Install Backend Dependencies**
   ```bash
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd ../client
   npm install
   ```

4. **Environment Variables**
   
   Create `.env` file in the backend directory:
   ```env
   MONGO_URI="mongodb://localhost:27017/easyfeet" (example)
   PORT=5000
   JWT_SECRET=your_jwt_secret_here
   
   # Payment Gateway(not yet introduced but for future reference)
   STRIPE_SECRET_KEY=your_stripe_secret_key
   STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
   
   # Email Configuration((not yet introduced but for future reference))
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_app_password
   
   # Cloudinary((not yet introduced but for future reference))
   CLOUDINARY_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

   Create `.env` file in the frontend directory:
   ```env
   VITE_API_BASE_URL=https://easyfeet-shoes.onrender.com
   REACT_APP_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key (for futrue reference)
   ```

5. **Run the Application**
   
   Backend:
   ```bash
   npm run start
   ```
   
   Frontend:
   ```bash
   cd frontend
   npm run dev
   ```

6. **Access the Application**
## 📱 Usage

### For Customers
1. Browse products by category
2. Search for specific items
3. Add products to cart
4. Create account or login
5. Proceed to checkout
6. Make payment (for future updation)
7. Track order status (future addition)

### For Admins(for future addition)
1. Login to admin dashboard
2. Manage products (CRUD operations)
3. View and manage orders
4. Manage user accounts
5. View analytics and reports

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/signup` - User signup
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `POST /api/auth/forgot-password` - Password reset (not yet added)

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create product (Admin) (not yet added)
- `PUT /api/products/:id` - Update product (Admin) (not yet added)
- `DELETE /api/products/:id` - Delete product (Admin) (not yet added)

### Cart
- `GET /api/cart` - Get user cart
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/:id` - Update cart item ( not yet added)
- `DELETE /api/cart/:id` - Remove item from cart

### Orders
- `GET /api/orders` - Get user orders
- `POST /api/orders` - Create new order
- `GET /api/orders/:id` - Get order details (not yet added)
- `PUT /api/orders/:id` - Update order status (Admin)

## 🚀 Deployment

### Frontend (Vercel)
1. Push code to GitHub repository
2. Connect repository to Vercel
3. Configure environment variables
4. Deploy automatically on push

### Backend (Render)
1. Connect GitHub repository to Render
2. Set up environment variables
3. Configure build and start commands
4. Deploy the service

### Environment Variables for Production
Make sure to set all required environment variables in your deployment platforms.

## 📸 Screenshots

### Home Page
![Home Page](<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/2754f36c-35fe-49da-9d6b-7d9fe8e6d72d" />)
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/e46d5625-67c2-4cde-a06a-d6142ed1ab95" />

### Product Catalog
![Product Catalog](<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/00a393a8-878e-4b15-b254-346553d95e9f" />)
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/8431b776-ed4f-4914-a5d0-95dc950405c6" />


### Shopping Cart
![Shopping Cart](<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/68d6f137-c44c-4fcd-ba3b-a3997dd37fa8" />)
![Ordering address](<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/669875cf-2b88-4f35-82a7-a40b559a7ec6" />)





## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines
- Follow the existing code style
- Write clear commit messages
- Add tests for new features
- Update documentation as needed


## 📞 Contact

**Developer**: Shevani
- GitHub: [@shevaniii](https://github.com/shevaniii)
- Email: [shivani.goswami212005@gmail.com](mailto:shivani.goswami212005@gmail.com)

**Project Link**: [https://github.com/shevaniii/Ecommerce-EASYFEET](https://github.com/shevaniii/Ecommerce-EASYFEET)

---

## 🙏 Acknowledgments

- [React Documentation](https://reactjs.org/)
- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Stripe API Documentation](https://stripe.com/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [Render Documentation](https://render.com/docs)

---

### 🌟 If you found this project helpful, please give it a star! ⭐

![Footer](<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/72d9cbea-b992-4eae-a069-81547e5eda80" />)
