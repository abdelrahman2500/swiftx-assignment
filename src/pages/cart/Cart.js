import React from 'react';
import CartItem from '../../components/cart-item/CartItem';
import { useCartProducts } from '../../hooks/useCartProducts';
import './index.css'
import { useNavigate } from 'react-router-dom';

export default function Cart({cartItems, setCartItems, setCartLength, handleDelete ,curr, active, handleAttr ,setModalIsOpen, inModal , handleActiveAttrItem}) {
    const navigate = useNavigate()

    
    function handleCheckout(){
        if(cartItems.find(el => el.attributes?.length != el.selectedAttributes?.attributes?.length)){
            alert("Please choose what suits you")
        } else {
            alert("checkout")
            setCartItems([])
            localStorage.removeItem("cart")
            setCartLength(0)
        }
        console.log(cartItems.find(el => el.attributes?.length != el.selectedAttributes?.attributes?.length))
        
    }

    console.log(cartItems);
    function handleDeleteAll(){
        if (window.confirm("are u sure")){
            setCartItems([])
            localStorage.removeItem("cart")
            setCartLength(0)
        }
    }
    function handleNavigate(){
        setModalIsOpen(false)
        navigate("/cart")
    }

    if (cartItems.length == 0) return <div className='empty__cart'>
        <img src='https://cdn3.iconfinder.com/data/icons/shopping-and-ecommerce-29/90/empty_cart-512.png' alt="empty cart" />
        <p>Your Bag Is Empty </p> 
    </div>;
    

    return (
        <div className={`${inModal ? 'cart__modal' : 'cart__page'}`}>
            <h2 className='cart__page--name'>{inModal? `My Bag ${cartItems.length} items` : 'Cart'}</h2>
            {
                cartItems.map(item => (
                    <CartItem key={item.id} inModal={inModal} cartItem={item} cartItems={cartItems} setCartItems={setCartItems} handleDelete={handleDelete} active={active} handleAttr={handleAttr} curr={curr} handleActiveAttrItem={handleActiveAttrItem} />    
                ))
            }
            {cartItems.length >=1 && !inModal && <div className='cart__page--checkout'>
                <h4 className='total__price'>
                    {curr}{cartItems.reduce((a,c) => a + (c.prices.find((price) => price.currency.symbol == curr).amount*c.count ) , 0  ).toFixed(2)}
                </h4>
                <button className='cart__checkout' onClick={()=> handleCheckout()}>Checkout</button>
                <button className='cart__deletaAll' onClick={()=> handleDeleteAll()}>Delete All Items</button>
            </div>}
            {cartItems.length >=1 && inModal && <div className='cart__modal--totalprice'>
                <p>Total</p>
                <p>{curr}{cartItems.reduce((a,c) => a + (c.prices.find((price) => price.currency.symbol == curr).amount*c.count ) , 0  ).toFixed(2)}</p>
            </div>
            }

            {cartItems.length >=1 && inModal && <div className='cart__modal--buttons'>
                <button className='gotocart' onClick={()=> handleNavigate()}>VIEW BAG</button>
                <button className='checkout' onClick={()=> handleCheckout()}>CHECK OUT</button>
            </div>
            }
        </div>
    );
}
