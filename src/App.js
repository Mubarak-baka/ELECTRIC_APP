import './App.css';
import Home from './Component/Home';
import About from './Component/About';
import Addproduct from './Component/Addproduct';
import Nopage from './Component/Nopage';
import Cart from './Component/Cart';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from './Component/Nav';
import Footer from './Component/Footer';
import React, {useState} from 'react'
import Productdetails from './Component/Productdetails';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [productData]=useState([]);

  return (
    <BrowserRouter>
    <div>
      <Nav /> 

      <Routes>
        {/ Define routes for different components /}
        <Route path="/" element={<Home  products={productData}  />} />
        <Route path="/about" element={<About />} />
        <Route path="/Addproduct" element={<Addproduct />} />
       <Route path="" element={<Nopage />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/Productdetails/:id" element={<Productdetails />} />

  </Routes>
  <ToastContainer />
  
  <Footer />
</div>
  </BrowserRouter>
  );
}

export default App;