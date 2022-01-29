
import {
  Routes,
  Route,
  useNavigate
} from "react-router-dom";
import './App.css';
import Navbar from './components/navbar/Navbar';
import { useCategoriesNames } from './hooks/useCategoriesNames';
import Products from './pages/products/Products';
import Product from './pages/product/Product';
import Home from "./pages/home/Home";
import Cart from './pages/cart/Cart';
import { useEffect, useState } from "react";

function App() {
  const [curr, setCurr] = useState("$");
  
  const [cart, setCart] = useState(localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [])
  const [cartLength, setCartLength] = useState(cart.length);
  
  function addToCart(productId){
      let areadyInCart = false ;
      cart.slice().forEach((itemId) => {
          if(itemId.productId === productId){
              areadyInCart = true
              itemId.count++ 
          }
      })
      if(!areadyInCart){
          cart.push({productId , count: 1})
      }
      localStorage.setItem("cart", JSON.stringify(cart))
      setCartLength(cart.length)
      console.log(areadyInCart);
  }

  const {error, data, loading} = useCategoriesNames()


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;


  return(
    <div className='App'>
      <div className='container'>
        <Navbar data={data} cartLength={cartLength} curr={curr} setCurr={setCurr} />
        <Routes>
          <Route exact path="/" element={<Home />}>
          </Route>
          {data.categories.map(category => (
              <Route key={category.name} path={category.name} element={<Products addToCart={addToCart} productName={category.name} setCartLength={setCartLength} curr={curr} />} />
          ))}
          {data.categories.map(category => (
              <Route key={category.name} path={`${category.name}/:productId`} element={<Product curr={curr} addToCart={addToCart} />} />
          ))}
              
          <Route path="cart" element={<Cart cartItems={cart} setCartItems={setCart} />}></Route>
        </Routes>
      </div>
    </div>
  )
}

export default App;
