
import Home from '../pages/Home';
import { Routes, Route } from 'react-router-dom';
import ProductDetail from '../pages/ProductDetail';
import { useState } from 'react';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Cart from '../pages/Cart';
import SignIn from '../pages/SignIn'
import CreateProduct from '../pages/CreateProduct';
import Header from '../components/Header';


function AppRoutes({cartItems, setCartItems}){
  // const [cartItems, setCartItems] = useState([])
  console.log(cartItems)
  return (

    <div>
      <ToastContainer theme='light' position='top-center' />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/search' element={<Home />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/create' element={<CreateProduct />} />
        <Route path='/header' element={<Header cartItems={cartItems} setCartItems={setCartItems} />} />
        <Route path='/product/:id' element={<ProductDetail cartItems={cartItems} setCartItems={setCartItems} />} />
        <Route path='/cart' element={<Cart cartItems={cartItems} setCartItems={setCartItems} />} />
      </Routes>
    </div>

  );
}

export default AppRoutes;
