import React, { useState } from 'react';
import './index.css'
import { useNavigate, useLocation } from 'react-router-dom';

export default function ProductItem({product, curr, setCartLength,addToCart}) {
    // const [cart, setCart] = useState(sessionStorage.getItem("cart") ? JSON.parse(sessionStorage.getItem("cart")) : [])

    const navigate = useNavigate()
    const location = useLocation()
    



    return(
        <div className='product__item' >
            <div className='product__item--card'>
                <div className={`overlay ${product.inStock ? "hide" : ""}`}>
                    <p>
                        OUT OF STOCK
                    </p>
                </div> 
                <div className='product__item--card--img' onClick={()=> product.inStock ? navigate(`${location.pathname}/${product.id}`) : ""}>
                    <img src={product.gallery[0]} />
                </div>
                <div className='product__item--card--details'>
                    <span className={`${product.inStock ? "" : "hide"}`} onClick={() => product.inStock ? addToCart(product) : ""}>
                        <img src='/images/icons/Vector-white.png' />
                    </span>
                    <h3 className='product__name'>
                        {product.name}
                    </h3>
                    <p className='product__price'>
                        {/* {product.prices[0].amount} */}
                        {product.prices.map((price,i) => price.currency.symbol == curr ? 
                            <b key={i}>
                                {price.currency.symbol}{" "}{price.amount}
                            </b>
                        : "")}
                    </p>
                </div>
            </div>
        </div>
    )
}
