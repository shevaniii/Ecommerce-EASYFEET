 # 🛒 EasyFeet E-commerce Platform
 
 A full-stack e-commerce application built with React, Node.js, Express, and MongoDB. This platform provides a complete shopping experience with user authentication, product catalog, shopping cart, and order management.
 
 ## 🚀 Features
 
 ### Frontend
 - **Modern React UI** with Redux state management
 - **Responsive Design** with Tailwind CSS
 - **User Authentication** (Login/Signup/Profile)
 - **Product Catalog** with search and filtering
 - **Shopping Cart** with quantity controls
 - **Order Management** with order history
 - **Error Boundaries** for better error handling
 - **Protected Routes** for authenticated users
 
 ### Backend
 - **RESTful API** with Express.js
 - **JWT Authentication** with secure tokens
 - **MongoDB Database** with Mongoose ODM
 - **Input Validation** and error handling
 - **Stock Management** with inventory tracking
 - **Order Processing** with status tracking
 - **CORS Configuration** for cross-origin requests
 
 ## 🛠️ Technology Stack


### Frontend
 - React 19
 - Redux Toolkit
 - React Router Dom
 - Axios
 - Tailwind CSS
 - Vite

### Backend
 - Node.js
 - Express.js
 - MongoDB
 - Mongoose
 - JWT
 - bcrypt
 - CORS

## 📦 Installation & Setup

### Prerequisites

 - Node.js (v16 or higher)
 - npm or yarn
 - MongoDB (local or cloud)

### Installation
 ### 1. Clone the Repository
 ```bash
 git clone https://github.com/shevaniii/Ecommerce-EASYFEET.git
 cd ecommerce-project
 ```

 ### 2. Backend Setup
 ```bash
 # Install backend dependencies
 npm install```

  # Create environment file
 cp .env.example .env
 
 # Configure your environment variables in .env
 # JWT_SECRET=your_jwt_secret_here
 # MONGODB_URI=mongodb://localhost:27017/ecommerce
 # PORT=3001
 ```

 ### 3. Frontend Setup
 ```bash
 # Navigate to client directory
 cd client
 
 # Install frontend dependencies
 npm install
 
 # Create environment file
 cp .env.example .env
 
 # Configure your environment variables
 # VITE_API_BASE_URL=http://localhost:3001
 ```
 
 ### 4. Database Setup
 Make sure MongoDB is running on your system, or configure a cloud MongoDB URI in your backend `.env` file.
 
 ### 5. Run the Application
 
 #### Development Mode
 ```bash
 # Terminal 1 - Backend
 npm run dev
 
 # Terminal 2 - Frontend
 cd client
 npm run dev
 ```
 #### Production Mode
 ```bash
 # Build frontend
 cd client
 npm run build
 
 # Start backend
 npm start
 ```
 
 ## 🔧 Environment Variables
 
 ### Backend (.env)
 ```env
 JWT_SECRET=your_super_secret_jwt_key
 MONGODB_URI=mongodb://localhost:27017/ecommerce
 PORT=3001
 NODE_ENV=development
 ```
 
 ### Frontend (client/.env)
 ```env
 VITE_API_BASE_URL=http://localhost:3001
 NODE_ENV=development
 ```
 
 ## 📡 API Endpoints
### Authentication
- `POST /api/auth/signup` - User registration   
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID

### Cart
 - `GET /api/auth/cart` - Get user cart
 - `POST /api/auth/cart/add` - Add item to cart
 - `PUT /api/auth/cart/update/:productId` - Update item quantity
 - `DELETE /api/auth/cart/remove/:productId` - Remove item from cart
 - `DELETE /api/auth/cart/clear` - Clear entire cart

### Orders
 - `GET /api/auth/order` - Get user orders
 - `GET /api/auth/order/:orderId` - Get specific order
 - `POST /api/auth/order/create` - Create new order
 - `PUT /api/auth/order/:orderId/status` - Update order status
 
 ## 🐛 Troubleshooting
 
 ### Common Issues and Solutions
 
 #### 1. Cart/Order Errors
 **Problem:** Cart items not displaying or order placement failing
 **Solutions:**
 - Check if user is authenticated (JWT token in localStorage)
 - Verify API endpoints are running
 - Check browser console for specific error messages
 - Ensure product stock is available
 
 #### 2. Database Connection Issues
 **Problem:** MongoDB connection errors
 **Solutions:**
 - Verify MongoDB is running
 - Check connection string in `.env` file
 - Ensure database permissions are correct
 
 #### 3. CORS Errors
 **Problem:** Cross-origin request blocked
 **Solutions:**
 - Verify CORS configuration in backend
 - Check if frontend URL is allowed in CORS settings
 - Ensure API base URL is correctly configured
 #### 4. Authentication Issues
 **Problem:** User login/signup not working
 **Solutions:**
 - Check JWT secret configuration
 - Verify password hashing is working
 - Ensure token is being stored in localStorage
 
 #### 5. Build Errors
 **Problem:** Frontend build failing
 **Solutions:**
 - Run `npm install` to ensure all dependencies are installed
 - Check for TypeScript/JSX syntax errors
 - Verify all imports are correct
 
 ### Debugging Tips
 1. **Check Browser Console** for JavaScript errors
 2. **Monitor Network Tab** for failed API requests
 3. **Check Backend Logs** for server-side errors
 4. **Verify Environment Variables** are loaded correctly
 5. **Test API Endpoints** using Postman or similar tools

## 🚀 Deployment

 ### Frontend Deployment (Vercel/Netlify)
 1. Build the project: `npm run build`
 2. Set environment variable: `VITE_API_BASE_URL=your_backend_url`
 3. Deploy the `dist` folder

### Backend Deployment (Render/Heroku)
 1. Set up environment variables on your hosting platform
 2. Configure MongoDB URI for production
 3. Update CORS settings for production domain
 4. Deploy with `npm start` command

 ```env
 # Backend
 JWT_SECRET=production_jwt_secret
 MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ecommerce
 PORT=3001
 NODE_ENV=production
 
 # Frontend
 VITE_API_BASE_URL=https://your-backend-domain.com
 NODE_ENV=production
 ```
 
 ## 📋 Key Improvements Made
 
 ### Backend Enhancements
 1. ✅ Fixed typo in cart model (`rquired` → `required`)
 2. ✅ Changed quantity default from string to number
 3. ✅ Added comprehensive input validation
 4. ✅ Implemented stock checking for cart and orders
 5. ✅ Added shipping address and phone fields to orders
 6. ✅ Enhanced error handling with specific error messages
 7. ✅ Added quantity update and clear cart functionality
 8. ✅ Implemented proper stock management
 
 ### Frontend Enhancements
 1. ✅ Fixed Redux state management for cart and orders
 2. ✅ Added quantity controls in cart page
 3. ✅ Implemented proper error handling and display
 4. ✅ Added loading states for better UX
 5. ✅ Created error boundary for crash protection
 6. ✅ Enhanced order display with detailed information
  7. ✅ Added protected routes for authentication
 8. ✅ Improved API error handling
 
 ### Security & Performance
 1. ✅ Proper JWT token validation
 2. ✅ Input sanitization and validation
 3. ✅ Error boundary implementation
 4. ✅ Optimized API calls with proper loading states
 5. ✅ Enhanced CORS configuration





## 🤝 Contributing

 1. Fork the repository
 2. Create a feature branch: `git checkout -b feature-name`
 3. Commit changes: `git commit -m 'Add feature'`
 4. Push to branch: `git push origin feature-name`
 5. Submit a pull request
 
 ## 📝 License
 
 This project is licensed under the ISC License.
 
 ## 👤 Author
 
 **Shivani Giri**
  ## 🆘 Need Help?
 
 If you encounter any issues:
 1. Check the troubleshooting section above
 2. Review the browser console for errors
 3. Check backend logs for server errors
 4. Ensure all environment variables are set correctly
 5. Verify database connectivity
 
 For additional support, please check the issues section or create a new issue with detailed error information.
