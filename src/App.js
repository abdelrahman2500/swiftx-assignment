
import {
  Routes,
  Route,
} from "react-router-dom";
import './App.css';
import Navbar from './components/navbar/Navbar';
import { useCategoriesNames } from './hooks/useCategoriesNames';
import Products from './pages/products/Products';
import Product from './pages/product/Product';
import Home from "./pages/home/Home";
import Cart from './pages/cart/Cart';
import { useState } from "react";
import PageNotFound from "./pages/page-not-found/PageNotFound";
import Loading from "./components/loading/Loading";

function App() {
  const [curr, setCurr] = useState("$");
  
  const [cart, setCart] = useState(localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [])
  const [selected, setSelected] = useState([])
  const [cartLength, setCartLength] = useState(cart.length);
  
  // Add product to cart
  function addToCart(product){
      let areadyInCart = false ;
      cart.slice().forEach((item) => {
          if(item.id === product.id){
              areadyInCart = true
              item.selectedAttributes= selected && selected.find(el => el.id == product.id) ? selected.find(el => el.id == product.id) : [] 
              item.count++ 
          }
      })
      if(!areadyInCart){
          cart.push({
            ...product,
            selectedAttributes: selected && selected.find(el => el.id == product.id) ? selected.find(el => el.id == product.id) : [],
            count: 1
          })
      }
      localStorage.setItem("cart", JSON.stringify(cart))
      setCartLength(cart.length)
  }

  // Delete product from cart
  function handleDelete(product){
    let cartItem = cart.slice()
    let filtered = cartItem.filter((item) => item.id !== product.id)
    setCart(filtered)
    localStorage.setItem("cart", JSON.stringify(filtered))
    setSelected([])
    setCartLength(filtered.length)
}

  // Handle active attributes in cart products 
  function handleActiveAttrItem(productId,attrId,itemId){

    let areadySelected = false ;
      selected.slice().forEach((item) => {
          if(item.id === productId){
            let modifing = false ;
            item.attributes.slice().forEach(attribute => {
              if(attribute.attrId == attrId){
                attribute.itemId = itemId
                modifing =true;
              } 
              
            })
            if(!modifing){
              item.attributes.push({
                attrId: attrId,
                itemId: itemId
              })
            }
            areadySelected =true
          }
      })
      if(!areadySelected){
          selected.push({
            id: productId,
            attributes: [{
              attrId: attrId,
              itemId: itemId
            }]
          })
      }
  }


  const {error, data, loading} = useCategoriesNames()


  if (loading) return <Loading />;
  if (error) return <PageNotFound />;


  return(
    <div className='App'>
      <div className='container'>
        <Navbar data={data} cartLength={cartLength} handleDelete={handleDelete} setCartLength={setCartLength}  curr={curr} setCurr={setCurr} cartItems={cart} setCartItems={setCart} handleActiveAttrItem={handleActiveAttrItem} />
        <Routes>
          <Route exact path="/" element={<Home />}>
          </Route>
          {data.categories.map(category => (
              <Route key={category.name} path={category.name} element={<Products addToCart={addToCart} categoryName={category.name} setCartLength={setCartLength} curr={curr} />} />
          ))}
          {data.categories.map(category => (
              <Route key={category.name} path={`${category.name}/:productId`} element={<Product handleActiveAttrItem={handleActiveAttrItem} curr={curr} cartItems={cart} setCartItems={setCart} addToCart={addToCart}  />} />
          ))}
              
          <Route path="cart" element={<Cart cartItems={cart} setCartItems={setCart} setCartLength={setCartLength} handleDelete={handleDelete}  curr={curr} inModal={false} handleActiveAttrItem={handleActiveAttrItem}/>}></Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </div>
  )
}

export default App;
