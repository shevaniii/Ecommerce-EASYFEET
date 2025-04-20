import Navbar from './components/Navbar'
import HomePage from './pages/HomePage.jsx'
import {Provider } from 'react-redux'
import {store } from './app/store.js'
import { Routes, Route , BrowserRouter } from 'react-router-dom'
import Footer from './components/Footer.jsx'
import ProductDetails from './pages/ProductDetails.jsx'
import ProductList from './pages/ProductList.jsx'

function App() {
  return (
    <Provider store={store}>
    <BrowserRouter >
    <Navbar />
    <Routes>
      <Route path='/' element= {<HomePage/>} />
      <Route path= '/products' element = {<ProductList /> } />
      <Route path='/products/:id' element = {<ProductDetails />} />
    </Routes>
    <Footer />
    </BrowserRouter>
    </Provider>
  )
}

export default App
