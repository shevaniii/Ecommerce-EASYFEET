import Navbar from './components/Navbar'
import HomePage from './pages/HomePage.jsx'
import {Provider } from 'react-redux'
import {store } from './app/store.js'
import { Routes, Route , BrowserRouter } from 'react-router-dom'
import Footer from './components/Footer.jsx'

function App() {
  return (
    <Provider store={store}>
    <BrowserRouter >
    <Navbar />
    <Routes>
      <Route path='/' element= {<HomePage/>} />
    </Routes>
    <Footer />
    </BrowserRouter>
    </Provider>
  )
}

export default App
