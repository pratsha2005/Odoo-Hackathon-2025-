import './App.css'
import Home from './pages/Home'
import { Route, Routes } from 'react-router-dom'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import SearchBar from './components/SearchBar'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Products from './pages/Products'
import Product from './pages/Product'
import AddProduct from './pages/AddProduct'
import Profile from './pages/Profile'
import Login from './pages/Login'
import ProtectedRoute from './components/ProtectedRoute'


function App() {

  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      <ToastContainer />
      <NavBar />
      <SearchBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/products' element={<Products />} />
        <Route path='/product/:productId' element={<Product />} />
        <Route element={<ProtectedRoute />}>
          <Route path='/add-product' element={<AddProduct />} />
          <Route path='/profile' element={<Profile />} />
        </Route>
        <Route path='/login' element={<Login />} />

        {/* Add more routes as needed */}
      </Routes>
      <Footer />
      <ToastContainer />
    </div>
  )
}

export default App
