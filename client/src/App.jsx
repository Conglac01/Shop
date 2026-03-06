import React, { useContext } from 'react'  // SỬA: thêm useContext
import { Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import Collection from './pages/Collection'
import CategoryCollection from './pages/CategoryCollection'
import ProductDetails from './pages/ProductDetails'
import Testimonial from './pages/Testimonial'
import Contact from './pages/Contact'
import Cart from './pages/Cart'
import PlaceOrder from './pages/PlaceOrder'
import MyOrder from './pages/MyOrder'
import Footer from './components/Footer'
import Login from './components/Login'
import { ShopContext } from './context/ShopContext'  // Import context
import { Toaster } from 'react-hot-toast'

const App = () => {
  const { showUserLogin } = useContext(ShopContext)  // SỬA: lấy từ context

  return (
    <div className="bg-primary min-h-screen">
      {showUserLogin && <Login />}  {/* Hiển thị Login khi showUserLogin = true */}
      <Header />
      <main className='overflow-hidden text-tertiary'>
        <Toaster position='bottom-right'/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/collection/:category" element={<CategoryCollection />} />
          <Route path="/collection/:category/:id" element={<ProductDetails />} />
          <Route path="/testimonial" element={<Testimonial />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/place-order" element={<PlaceOrder />} />
          <Route path="/my-orders" element={<MyOrder />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App