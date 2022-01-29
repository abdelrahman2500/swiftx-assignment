import React from 'react';
import './index.css'

export default function Cart({cartItems, setCartItems}) {
    return (
        <div className=''>
            {cartItems.length}
        </div>
    );
}
