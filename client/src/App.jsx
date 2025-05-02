import Navbar from './components/Navbar'
import HomePage from './pages/HomePage.jsx'
import {Provider } from 'react-redux'
import {store } from './app/store.js'
import { Routes, Route , BrowserRouter } from 'react-router-dom'
import Footer from './components/Footer.jsx'
import ProductDetails from './pages/ProductDetails.jsx'
import ProductList from './pages/ProductList.jsx'
import CartPage from './pages/CartPage.jsx'
import LoginPage from './pages/loginPage.jsx'
import SignupPage from './pages/signupPage.jsx'

function App() {
  return (
    <Provider store={store}>
    <BrowserRouter >
    <Navbar />
    <Routes>
      <Route path='/' element= {<HomePage/>} />
      <Route path= '/products' element = {<ProductList /> } />
      <Route path='/products/:id' element = {<ProductDetails />} />
      <Route path='/cart' element = {<CartPage />} />
      <Route path='/login' element = {<LoginPage />} />
      <Route path= '/signup' element = {<SignupPage />} />
    </Routes>
    <Footer />
    </BrowserRouter>
    </Provider>
  )
}

export default App
